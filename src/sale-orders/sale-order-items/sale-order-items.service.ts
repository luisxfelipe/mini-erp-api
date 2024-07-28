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

@Injectable()
export class SaleOrderItemsService {
  constructor(
    @InjectRepository(SaleOrderItem)
    private readonly repository: Repository<SaleOrderItem>,
    @Inject(forwardRef(() => SaleOrdersService))
    private readonly saleOrdersService: SaleOrdersService,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(ProductVariationsService)
    private readonly productVariationsService: ProductVariationsService,
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

    return await this.repository.save(
      this.repository.create({
        ...createSaleOrderItemDto,
        saleOrderId,
      }),
    );
  }

  async findAll(saleOrderId: number): Promise<SaleOrderItem[]> {
    return await this.repository.findBy({ saleOrderId });
  }

  async findOne(id: number, isRelations?: boolean): Promise<SaleOrderItem> {
    try {
      const saleOrderItem = await this.repository.findOneOrFail({
        where: { id },
        relations: {
          saleOrder: isRelations ? true : false,
          product: isRelations ? true : false,
          productVariation: isRelations ? true : false,
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

    return await this.repository.save({
      ...saleOrderItem,
      ...updateSaleOrderItemDto,
    });
  }
}
