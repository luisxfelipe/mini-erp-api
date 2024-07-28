import { ReturnSaleOrderRefundDto } from '../../dto/return-sale-order-refund.dto';
import { saleOrderRefundMock } from './sale-order-refund.mock';

export const returnSaleOrderRefundMock: ReturnSaleOrderRefundDto = {
  id: saleOrderRefundMock.id,
  saleOrderId: saleOrderRefundMock.saleOrderId,
  amount: saleOrderRefundMock.amount,
  reason: saleOrderRefundMock.reason,
};
