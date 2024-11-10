import { PurchaseOrderStatus } from '../entities/purchase-order-status.entity';

export class ReturnPurchaseOrderStatusDto {
  id: number;
  name: string;

  constructor(purchaseOrderStatus: PurchaseOrderStatus) {
    this.id = purchaseOrderStatus.id;
    this.name = purchaseOrderStatus.name;
  }
}
