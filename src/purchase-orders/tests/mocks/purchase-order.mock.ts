import { purchaseOrderStatusMock } from './../../../purchase-orders/purchase-order-status/tests/mocks/purchase-order-status.mock';
import { PurchaseOrder } from '../../entities/purchase-order.entity';
import { supplierMock } from './../../../suppliers/tests/mocks/supplier.mock';

export const purchaseOrderMock: PurchaseOrder = {
  id: 1,
  date: new Date(),
  supplierId: supplierMock.id,
  orderNumber: '123456789',
  trackingCode: 'BR123456789SP',
  purchaseOrderStatusId: purchaseOrderStatusMock.id,
  discount: 10,
  shippingCost: 30,
  createdAt: new Date(),
  updatedAt: new Date(),
};
