import { ReturnSupplierDto } from 'src/suppliers/dto/return-supplier.dto';

import { PurchaseOrder } from '../entities/purchase-order.entity';
import { ReturnPurchaseOrderStatusDto } from '../purchase-order-status/dto/return-purchase-order-status.dto';

export class ReturnPurchaseOrderDto {
  id: number;
  supplier?: ReturnSupplierDto;
  orderNumber?: string;
  trackingCode?: string;
  purchaseOrderStatus?: ReturnPurchaseOrderStatusDto;
  discount?: number;
  shippingCost?: number;

  constructor(purchaseOrderEntity: PurchaseOrder) {
    this.id = purchaseOrderEntity.id;
    this.supplier = purchaseOrderEntity.supplier
      ? new ReturnSupplierDto(purchaseOrderEntity.supplier)
      : undefined;
    this.orderNumber = purchaseOrderEntity.orderNumber
      ? purchaseOrderEntity.orderNumber
      : undefined;
    this.trackingCode = purchaseOrderEntity.trackingCode
      ? purchaseOrderEntity.trackingCode
      : undefined;
    this.purchaseOrderStatus = purchaseOrderEntity.purchaseOrderStatus
      ? new ReturnPurchaseOrderStatusDto(
          purchaseOrderEntity.purchaseOrderStatus,
        )
      : undefined;
    this.discount = purchaseOrderEntity.discount
      ? purchaseOrderEntity.discount
      : undefined;
    this.shippingCost = purchaseOrderEntity.shippingCost
      ? purchaseOrderEntity.shippingCost
      : undefined;
  }
}
