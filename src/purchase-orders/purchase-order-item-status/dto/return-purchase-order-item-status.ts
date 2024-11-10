import { PurchaseOrderItemStatus } from '../entities/purchase-order-item-status.entity';

export class ReturnPurchaseOrderItemStatusDto {
  id: number;
  name: string;

  constructor(purchaseOrderStatus: PurchaseOrderItemStatus) {
    this.id = purchaseOrderStatus.id;
    this.name = purchaseOrderStatus.name;
  }
}
