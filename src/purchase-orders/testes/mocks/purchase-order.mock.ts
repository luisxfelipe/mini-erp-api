import { PurchaseOrder } from './../../../purchase-orders/entities/purchase-order.entity';

export const purchaseOrderMock: PurchaseOrder = {
  id: 1,
  supplierId: 1,
  orderNumber: '123456',
  trackingCode: '123456',
  purchaseOrderStatusId: 1,
  discount: 10,
  shippingCost: 30,
  createdAt: new Date(),
  updatedAt: new Date(),
};
