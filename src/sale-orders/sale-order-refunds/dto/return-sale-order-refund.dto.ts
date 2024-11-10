import { SaleOrderRefund } from '../entities/sale-order-refund.entity';

export class ReturnSaleOrderRefundDto {
  id: number;
  saleOrderId: number;
  amount: number;
  reason: string;

  constructor(saleOrderRefundEntity: SaleOrderRefund) {
    this.id = saleOrderRefundEntity.id;
    this.saleOrderId = saleOrderRefundEntity.saleOrderId;
    this.amount = saleOrderRefundEntity.amount;
    this.reason = saleOrderRefundEntity.reason;
  }
}
