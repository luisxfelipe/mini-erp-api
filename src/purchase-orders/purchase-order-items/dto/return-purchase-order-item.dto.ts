import { PurchaseOrderItem } from '../entities/purchase-order-item.entity';

export class ReturnPurchaseOrderItemDto {
  id: number;
  purchaseOrderId: number;
  productId: number;
  productVariationId: number;
  supplierProductCode?: string;
  price: number;
  quantity: number;
  product_link?: string;

  constructor(purchaseOrderItemEntity: PurchaseOrderItem) {
    this.id = purchaseOrderItemEntity.id;
    this.purchaseOrderId = purchaseOrderItemEntity.purchaseOrderId;
    this.productId = purchaseOrderItemEntity.productId;
    this.productVariationId = purchaseOrderItemEntity.productVariationId;
    this.supplierProductCode = purchaseOrderItemEntity.supplierProductCode
      ? purchaseOrderItemEntity.supplierProductCode
      : undefined;
    this.price = purchaseOrderItemEntity.price;
    this.quantity = purchaseOrderItemEntity.quantity;
    this.product_link = purchaseOrderItemEntity.product_link
      ? purchaseOrderItemEntity.product_link
      : undefined;
  }
}
