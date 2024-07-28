import { CreateSalesOrderDto } from './../../../sales-orders/dto/create-sales-order.dto';
import { platformMock } from './../../../sales-orders/sale-platforms/tests/mocks/platform.mock';
import { saleStatusMock } from './../../../sales-orders/sale-status/tests/mocks/sale-status.mock';

export const createSalesOrderMock: CreateSalesOrderDto = {
  orderNumber: '123456789',
  trackingCode: 'BR123456789SP',
  platformId: platformMock.id,
  statusId: saleStatusMock.id,
  discount: 10,
  shippingCost: 30,
};
