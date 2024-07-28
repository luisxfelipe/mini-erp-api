import { SaleOrder } from '../../entities/sale-order.entity';
import { platformMock } from '../../sale-platforms/tests/mocks/platform.mock';
import { saleStatusMock } from '../../sale-status/tests/mocks/sale-status.mock';

export const saleOrderMock: SaleOrder = {
  id: 1,
  orderNumber: '123456789',
  trackingCode: 'BR123456789SP',
  platformId: platformMock.id,
  statusId: saleStatusMock.id,
  discount: 10,
  shippingCost: 30,
  createdAt: new Date(),
  updatedAt: new Date(),
};
