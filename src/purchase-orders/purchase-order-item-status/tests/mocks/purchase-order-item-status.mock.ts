import { PurchaseOrderItemStatus } from '../../entities/purchase-order-item-status.entity';

export const purchaseOrderItemStatusMock: PurchaseOrderItemStatus = {
  id: 1,
  name: 'pending',
  createdAt: new Date(),
  updatedAt: new Date(),
  purchaseOrderItems: [],
};
