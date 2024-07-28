import { SaleOrderRefund } from '../../entities/sale-order-refund.entity';

export const saleOrderRefundMock: SaleOrderRefund = {
  id: 1,
  saleOrderId: 1,
  amount: 10,
  reason: 'Test',
  createdAt: new Date(),
  updatedAt: new Date(),
};
