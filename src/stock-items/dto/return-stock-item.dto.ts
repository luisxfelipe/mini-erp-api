import { StockItem } from '../entities/stock-item.entity';

export class ReturnStockItemDto {
  id: number;
  purchaseOrderItemId: number;
  productId: number;
  productVariationId: number;
  saleOrderItemId?: number;
  stockItemStatusId: number;
  batchNumber: number;
  manufactureDate?: Date;
  expirationDate?: Date;

  constructor(stockItemEntity: StockItem) {
    this.id = stockItemEntity.id;
    this.purchaseOrderItemId = stockItemEntity.purchaseOrderItemId;
    this.productId = stockItemEntity.productId;
    this.productVariationId = stockItemEntity.productVariationId;
    this.saleOrderItemId = stockItemEntity.saleOrderItemId
      ? stockItemEntity.saleOrderItemId
      : undefined;
    this.stockItemStatusId = stockItemEntity.stockItemStatusId;
    this.batchNumber = stockItemEntity.batchNumber;
    this.manufactureDate = stockItemEntity.manufactureDate
      ? stockItemEntity.manufactureDate
      : undefined;
    this.expirationDate = stockItemEntity.expirationDate
      ? stockItemEntity.expirationDate
      : undefined;
  }
}
