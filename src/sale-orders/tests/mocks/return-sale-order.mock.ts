import { ReturnSaleOrderDto } from '../../dto/return-sale-order.dto';

import { saleOrderMock } from './sale-order.mock';
import { returnPlatformMock } from '../../../platforms/tests/mocks/return-platform.mock';

export const returnSaleOrderMock: ReturnSaleOrderDto = {
  id: saleOrderMock.id,
  date: saleOrderMock.date,
  orderNumber: saleOrderMock.orderNumber,
  trackingCode: saleOrderMock.trackingCode,
  platform: returnPlatformMock,
  saleStatus: saleOrderMock.saleStatus,
  discount: saleOrderMock.discount,
  shippingCost: saleOrderMock.shippingCost,
};
