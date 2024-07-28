import { ReturnSaleOrderDto } from './../../../sales-orders/dto/return-sale-order.dto';

import { saleOrderMock } from './sale-order.mock';
import { returnPlatformMock } from './../../../sales-orders/sale-platforms/tests/mocks/return-platform.mock';

export const returnSaleOrderMock: ReturnSaleOrderDto = {
  id: saleOrderMock.id,
  orderNumber: saleOrderMock.orderNumber,
  trackingCode: saleOrderMock.trackingCode,
  salePlatform: returnPlatformMock,
  saleStatus: saleOrderMock.saleStatus,
  discount: saleOrderMock.discount,
  shippingCost: saleOrderMock.shippingCost,
};
