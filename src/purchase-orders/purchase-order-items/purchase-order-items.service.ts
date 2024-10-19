import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseOrderItemDto } from './dto/create-purchase-order-item.dto';
import { UpdatePurchaseOrderItemDto } from './dto/update-purchase-order-item.dto';
import { PurchaseOrderItem } from './entities/purchase-order-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { ProductsService } from './../../products/products.service';
import { ProductVariationsService } from './../../products/product-variations/product-variations.service';
import { PurchaseOrderItemStatusService } from '../purchase-order-item-status/purchase-order-item-status.service';

@Injectable()
export class PurchaseOrderItemsService {
  constructor(
    @InjectRepository(PurchaseOrderItem)
    private readonly repository: Repository<PurchaseOrderItem>,
    @Inject(forwardRef(() => PurchaseOrdersService))
    private readonly purchaseOrdersService: PurchaseOrdersService,
    @Inject(forwardRef(() => PurchaseOrdersService))
    private readonly purchaseOrderItemStatusService: PurchaseOrderItemStatusService,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(ProductVariationsService)
    private readonly productVariationsService: ProductVariationsService,
  ) {}

  async calculateTotalValue(purchaseOrderId: number): Promise<number> {
    const purchaseOrderItems = await this.findAll(purchaseOrderId);
    const totalValue = purchaseOrderItems.reduce((total, purchaseOrderItem) => {
      return total + purchaseOrderItem.price;
    }, 0);
    return parseFloat(totalValue.toFixed(2));
  }

  async create(
    purchaseOrderId: number,
    createPurchaseOrderItemDto: CreatePurchaseOrderItemDto,
  ): Promise<PurchaseOrderItem> {
    await this.purchaseOrdersService.findOne(purchaseOrderId);
    await this.productsService.findOne(createPurchaseOrderItemDto.productId);
    await this.productVariationsService.findOne(
      createPurchaseOrderItemDto.productVariationId,
    );

    const purchaseOrderItem = await this.repository.findOneBy({
      productId: createPurchaseOrderItemDto.productId,
      productVariationId: createPurchaseOrderItemDto.productVariationId,
      purchaseOrderId,
    });

    if (purchaseOrderItem) {
      throw new BadRequestException(
        `Purchase order item with productId ${createPurchaseOrderItemDto.productId} and productVariationId ${createPurchaseOrderItemDto.productVariationId} already exists`,
      );
    }

    return await this.repository.save(
      this.repository.create({
        ...createPurchaseOrderItemDto,
        purchaseOrderId,
      }),
    );
  }

  async findAll(purchaseOrderId: number): Promise<PurchaseOrderItem[]> {
    const findOptions = {
      where: { purchaseOrderId },
      relations: {
        product: true,
        productVariation: true,
        purchaseOrderItemStatus: true,
      },
    };
    return await this.repository.find(findOptions);
  }

  async findOne(id: number, isRelations?: boolean): Promise<PurchaseOrderItem> {
    try {
      const purchaseOrderItem = await this.repository.findOneOrFail({
        where: { id },
        relations: {
          purchaseOrder: isRelations ? true : false,
          product: isRelations ? true : false,
          productVariation: isRelations ? true : false,
          purchaseOrderItemStatus: isRelations ? true : false,
        },
      });

      return purchaseOrderItem;
    } catch (error) {
      throw new NotFoundException('Purchase order item not found');
    }
  }

  async update(
    id: number,
    updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto,
  ): Promise<PurchaseOrderItem> {
    const purchaseOrderItem = await this.findOne(id);

    const product = await this.productsService.findOne(
      updatePurchaseOrderItemDto.productId,
    );

    const productVariation = await this.productVariationsService.findOne(
      updatePurchaseOrderItemDto.productVariationId,
    );

    const purchaseOrderItemStatus =
      await this.purchaseOrderItemStatusService.findOne(
        updatePurchaseOrderItemDto.purchaseOrderItemStatusId,
      );

    return await this.repository.save({
      ...purchaseOrderItem,
      ...updatePurchaseOrderItemDto,
      product,
      productVariation,
      purchaseOrderItemStatus,
    });
  }
}
