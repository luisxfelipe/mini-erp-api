import { CreateSaleOrderDto } from '../../dto/create-sales-order.dto';
import { platformMock } from '../../sale-platforms/tests/mocks/platform.mock';
import { saleStatusMock } from '../../sale-status/tests/mocks/sale-status.mock';

export const createSaleOrderMock: CreateSaleOrderDto = {
  orderNumber: '123456789',
  trackingCode: 'BR123456789SP',
  platformId: platformMock.id,
  statusId: saleStatusMock.id,
  discount: 10,
  shippingCost: 30,
};
