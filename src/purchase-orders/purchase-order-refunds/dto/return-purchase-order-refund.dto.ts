import { PurchaseOrderRefund } from '../entities/purchase-order-refund.entity';

export class ReturnPurchaseOrderRefundDto {
  id: number;
  purchaseOrderId: number;
  amount: number;
  reason: string;

  constructor(purchaseOrderRefundEntity: PurchaseOrderRefund) {
    this.id = purchaseOrderRefundEntity.id;
    this.purchaseOrderId = purchaseOrderRefundEntity.purchaseOrderId;
    this.amount = purchaseOrderRefundEntity.amount;
    this.reason = purchaseOrderRefundEntity.reason;
  }
}
