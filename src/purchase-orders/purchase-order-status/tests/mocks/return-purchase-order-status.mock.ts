import { ReturnPurchaseOrderStatusDto } from '../../dto/return-purchase-order-status.dto';
import { purchaseOrderStatusMock } from './purchase-order-status.mock';

export const returnPurchaseOrderStatusMock: ReturnPurchaseOrderStatusDto = {
  id: purchaseOrderStatusMock.id,
  name: purchaseOrderStatusMock.name,
};
