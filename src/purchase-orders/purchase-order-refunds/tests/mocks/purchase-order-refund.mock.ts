import { PurchaseOrderRefund } from '../../entities/purchase-order-refund.entity';

export const purchaseOrderRefundMock: PurchaseOrderRefund = {
  id: 1,
  purchaseOrderId: 1,
  amount: 10,
  reason: 'Test',
  createdAt: new Date(),
  updatedAt: new Date(),
};
