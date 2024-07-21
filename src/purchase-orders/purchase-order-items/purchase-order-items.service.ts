import {
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
import { ProductsService } from 'src/products/products.service';
import { ProductVariationsService } from 'src/products/product-variations/product-variations.service';

@Injectable()
export class PurchaseOrderItemsService {
  constructor(
    @InjectRepository(PurchaseOrderItem)
    private readonly repository: Repository<PurchaseOrderItem>,
    @Inject(forwardRef(() => PurchaseOrdersService))
    private readonly purchaseOrdersService: PurchaseOrdersService,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(ProductVariationsService)
    private readonly productVariationsService: ProductVariationsService,
  ) {}

  async create(
    purchaseOrderId: number,
    createPurchaseOrderItemDto: CreatePurchaseOrderItemDto,
  ): Promise<PurchaseOrderItem> {
    await this.purchaseOrdersService.findOne(purchaseOrderId);
    await this.productsService.findOne(createPurchaseOrderItemDto.productId);
    await this.productVariationsService.findOne(
      createPurchaseOrderItemDto.productVariationId,
    );

    return await this.repository.save(
      this.repository.create({
        ...createPurchaseOrderItemDto,
        purchaseOrderId,
      }),
    );
  }

  async findAll(purchaseOrderId: number): Promise<PurchaseOrderItem[]> {
    return await this.repository.findBy({ purchaseOrderId });
  }

  async findOne(id: number, isRelations?: boolean): Promise<PurchaseOrderItem> {
    try {
      const purchaseOrderItem = await this.repository.findOneOrFail({
        where: { id },
        relations: {
          purchaseOrder: isRelations ? true : false,
          product: isRelations ? true : false,
          productVariation: isRelations ? true : false,
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

    return await this.repository.save({
      ...purchaseOrderItem,
      ...updatePurchaseOrderItemDto,
    });
  }
}
