import { CreateSaleOrderDto } from '../../dto/create-sales-order.dto';
import { platformMock } from '../../../platforms/tests/mocks/platform.mock';
import { saleStatusMock } from '../../sale-status/tests/mocks/sale-status.mock';

export const createSaleOrderMock: CreateSaleOrderDto = {
  date: new Date(),
  orderNumber: '123456789',
  trackingCode: 'BR123456789SP',
  platformId: platformMock.id,
  statusId: saleStatusMock.id,
  discount: 10,
  shippingCost: 30,
};
