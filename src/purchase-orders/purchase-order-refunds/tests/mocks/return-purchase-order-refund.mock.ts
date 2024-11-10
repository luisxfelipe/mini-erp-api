import { ReturnPurchaseOrderRefundDto } from '../../dto/return-purchase-order-refund.dto';
import { purchaseOrderRefundMock } from './purchase-order-refund.mock';

export const returnPurchaseOrderRefundMock: ReturnPurchaseOrderRefundDto = {
  id: purchaseOrderRefundMock.id,
  purchaseOrderId: purchaseOrderRefundMock.purchaseOrderId,
  amount: purchaseOrderRefundMock.amount,
  reason: purchaseOrderRefundMock.reason,
};
