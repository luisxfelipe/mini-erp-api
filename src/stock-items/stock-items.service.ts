import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockItemDto } from './dto/create-stock-item.dto';
import { UpdateStockItemDto } from './dto/update-stock-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockItem } from './entities/stock-item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from './../products/products.service';
import { ProductVariationsService } from './../products/product-variations/product-variations.service';
import { PurchaseOrderItemsService } from './../purchase-orders/purchase-order-items/purchase-order-items.service';
import { SaleOrderItemsService } from './../sale-orders/sale-order-items/sale-order-items.service';
import { StockItemStatusService } from './stock-item-status/stock-item-status.service';
import { UpdatePurchaseOrderItemDto } from 'src/purchase-orders/purchase-order-items/dto/update-purchase-order-item.dto';

@Injectable()
export class StockItemsService {
  constructor(
    @InjectRepository(StockItem)
    private readonly repository: Repository<StockItem>,
    @Inject(PurchaseOrderItemsService)
    private readonly purchaseOrderItemsService: PurchaseOrderItemsService,
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(ProductVariationsService)
    private readonly productVariationsService: ProductVariationsService,
    @Inject(forwardRef(() => SaleOrderItemsService))
    private readonly saleOrderItemsService: SaleOrderItemsService,
    @Inject(StockItemStatusService)
    private readonly stockItemStatusService: StockItemStatusService,
  ) {}

  async postSoldItem(saleOrderId: number, productVariationId: number) {
    const product = await this.repository.findOne({
      where: {
        productVariationId,
        stockItemStatusId: 1,
        saleOrderItemId: null,
      },
    });

    if (!product) {
      throw new NotFoundException(
        `Product variation ${productVariationId} is out of stock`,
      );
    }

    const stockItem = await this.repository.update(product.id, {
      saleOrderItemId: saleOrderId,
      stockItemStatusId: 2,
    });

    return stockItem;
  }

  async create(
    createStockItemDtos: CreateStockItemDto[],
  ): Promise<StockItem[]> {
    const stockItems = [];

    for (const createStockItemDto of createStockItemDtos) {
      const stockItem = await this.repository.findOne({
        where: {
          purchaseOrderItemId: createStockItemDto.purchaseOrderItemId,
        },
      });

      if (stockItem) {
        throw new NotFoundException(
          `The purchase order item ${createStockItemDto.purchaseOrderItemId} has already been released in stock`,
        );
      }
    }

    for (const createStockItemDto of createStockItemDtos) {
      if (
        !createStockItemDto.identifier ||
        !createStockItemDto.identifierTypeId
      ) {
        delete createStockItemDto.identifier;
        delete createStockItemDto.identifierTypeId;
      }
      await this.purchaseOrderItemsService.findOne(
        createStockItemDto.purchaseOrderItemId,
      );
      await this.productsService.findOne(createStockItemDto.productId);
      await this.productVariationsService.findOne(
        createStockItemDto.productVariationId,
      );
      if (createStockItemDto.saleOrderItemId) {
        await this.saleOrderItemsService.findOne(
          createStockItemDto.saleOrderItemId,
        );
      }
      await this.stockItemStatusService.findOne(
        createStockItemDto.stockItemStatusId,
      );

      const stockItem = this.repository.create(createStockItemDto);
      stockItems.push(stockItem);
    }

    const result = await this.repository.save(stockItems);

    for (const stockItem of result) {
      const updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto = {
        purchaseOrderItemStatusId: 1,
      };
      await this.purchaseOrderItemsService.update(
        stockItem.purchaseOrderItemId,
        updatePurchaseOrderItemDto,
      );
    }

    return result;
  }

  async findAll(): Promise<StockItem[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<StockItem> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Stock item not found');
    }
  }

  async update(
    id: number,
    updateStockItemDto: UpdateStockItemDto,
  ): Promise<StockItem> {
    await this.findOne(id);

    if (updateStockItemDto.purchaseOrderItemId) {
      await this.purchaseOrderItemsService.findOne(
        updateStockItemDto.purchaseOrderItemId,
      );
    }

    if (updateStockItemDto.productId) {
      await this.productsService.findOne(updateStockItemDto.productId);
    }

    if (updateStockItemDto.productVariationId) {
      await this.productVariationsService.findOne(
        updateStockItemDto.productVariationId,
      );
    }

    if (updateStockItemDto.saleOrderItemId) {
      await this.saleOrderItemsService.findOne(
        updateStockItemDto.saleOrderItemId,
      );
    }

    if (updateStockItemDto.stockItemStatusId) {
      await this.stockItemStatusService.findOne(
        updateStockItemDto.stockItemStatusId,
      );
    }

    return await this.repository.save(
      this.repository.create({ ...updateStockItemDto, id }),
    );
  }
}
