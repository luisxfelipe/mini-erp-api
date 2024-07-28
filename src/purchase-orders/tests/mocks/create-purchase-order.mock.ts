import { CreatePurchaseOrderDto } from './../../../purchase-orders/dto/create-purchase-order.dto';
import { purchaseOrderStatusMock } from './../../../purchase-orders/purchase-order-status/tests/mocks/purchase-order-status.mock';
import { supplierMock } from './../../../suppliers/tests/mocks/supplier.mock';

export const createPurchaseOrderMock: CreatePurchaseOrderDto = {
  supplierId: supplierMock.id,
  orderNumber: '123456789',
  trackingCode: 'BR123456789SP',
  purchaseOrderStatusId: purchaseOrderStatusMock.id,
  discount: 10,
  shippingCost: 30,
};
