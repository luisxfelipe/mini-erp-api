import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleOrderItemDto } from './dto/create-sale-order-item.dto';
import { UpdateSaleOrderItemDto } from './dto/update-sale-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleOrderItem } from './entities/sale-order-item.entity';
import { Repository } from 'typeorm';
import { SaleOrdersService } from '../sale-orders.service';
import { ProductsService } from './../../products/products.service';
import { ProductVariationsService } from './../../products/product-variations/product-variations.service';
import { SaleOrderItemStatusService } from '../sale-order-item-status/sale-order-item-status.service';
import { StockItemsService } from 'src/stock-items/stock-items.service';

@Injectable()
export class SaleOrderItemsService {
  constructor(
    @InjectRepository(SaleOrderItem)
    private readonly repository: Repository<SaleOrderItem>,
    @Inject(forwardRef(() => SaleOrdersService))
    private readonly saleOrdersService: SaleOrdersService,
    @Inject(SaleOrderItemStatusService)
    private readonly saleOrderItemStatusService: SaleOrderItemStatusService,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(ProductVariationsService)
    private readonly productVariationsService: ProductVariationsService,
    @Inject(StockItemsService)
    private readonly stockItemsService: StockItemsService,
  ) {}

  async calculateTotalValue(saleOrderId: number): Promise<number> {
    const saleOrderItems = await this.findAll(saleOrderId);
    const totalValue = saleOrderItems.reduce((total, saleOrderItem) => {
      return total + saleOrderItem.price;
    }, 0);
    return parseFloat(totalValue.toFixed(2));
  }

  async create(
    saleOrderId: number,
    createSaleOrderItemDto: CreateSaleOrderItemDto,
  ): Promise<SaleOrderItem> {
    await this.saleOrdersService.findOne(saleOrderId);
    await this.productsService.findOne(createSaleOrderItemDto.productId);
    await this.productVariationsService.findOne(
      createSaleOrderItemDto.productVariationId,
    );

    const saleOrderItem = await this.repository.findOneBy({
      productId: createSaleOrderItemDto.productId,
      productVariationId: createSaleOrderItemDto.productVariationId,
      saleOrderId,
    });

    if (saleOrderItem) {
      throw new BadRequestException(
        `Sale order item with productId ${createSaleOrderItemDto.productId} and productVariationId ${createSaleOrderItemDto.productVariationId} already exists`,
      );
    }

    const stockItem = await this.stockItemsService.postSoldItem(
      saleOrderId,
      createSaleOrderItemDto.productVariationId,
    );

    if (!stockItem) {
      throw new BadRequestException(
        `Product variation ${createSaleOrderItemDto.productVariationId} is out of stock`,
      );
    }

    return await this.repository.save(
      this.repository.create({
        ...createSaleOrderItemDto,
        saleOrderId,
      }),
    );
  }

  async findAll(saleOrderId: number): Promise<SaleOrderItem[]> {
    const findOptions = {
      where: { saleOrderId },
      relations: {
        product: true,
        productVariation: true,
        saleOrderItemStatus: true,
      },
    };
    return await this.repository.find(findOptions);
  }

  async findOne(id: number, isRelations?: boolean): Promise<SaleOrderItem> {
    try {
      const saleOrderItem = await this.repository.findOneOrFail({
        where: { id },
        relations: {
          saleOrder: isRelations ? true : false,
          product: isRelations ? true : false,
          productVariation: isRelations ? true : false,
          saleOrderItemStatus: isRelations ? true : false,
        },
      });

      return saleOrderItem;
    } catch (error) {
      throw new NotFoundException('Sale order item not found');
    }
  }

  async update(
    id: number,
    updateSaleOrderItemDto: UpdateSaleOrderItemDto,
  ): Promise<SaleOrderItem> {
    const saleOrderItem = await this.findOne(id);

    const product = await this.productsService.findOne(
      updateSaleOrderItemDto.productId,
    );

    const productVariation = await this.productVariationsService.findOne(
      updateSaleOrderItemDto.productVariationId,
    );

    const saleOrderItemStatus = await this.saleOrderItemStatusService.findOne(
      updateSaleOrderItemDto.saleOrderItemStatusId,
    );

    return await this.repository.save({
      ...saleOrderItem,
      ...updateSaleOrderItemDto,
      product,
      productVariation,
      saleOrderItemStatus,
    });
  }
}
