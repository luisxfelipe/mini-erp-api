import { ReturnPurchaseOrderDto } from './../../../purchase-orders/dto/return-purchase-order.dto';
import { purchaseOrderMock } from './purchase-order.mock';
import { returnSupplierMock } from './../../../suppliers/tests/mocks/return-supplier.mock';

export const returnPurchaseOrderMock: ReturnPurchaseOrderDto = {
  id: purchaseOrderMock.id,
  date: purchaseOrderMock.date,
  supplier: returnSupplierMock,
  orderNumber: purchaseOrderMock.orderNumber,
  trackingCode: purchaseOrderMock.trackingCode,
  purchaseOrderStatus: purchaseOrderMock.purchaseOrderStatus,
  discount: purchaseOrderMock.discount,
  shippingCost: purchaseOrderMock.shippingCost,
};
