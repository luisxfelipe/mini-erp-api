import { ReturnPurchaseOrderItemDto } from '../../dto/return-purchase-order-item.dto';
import { purchaseOrderItemMock } from './purchase-order-item.mock';

export const returnPurchaseOrderItemMock: ReturnPurchaseOrderItemDto = {
  id: purchaseOrderItemMock.id,
  purchaseOrderId: purchaseOrderItemMock.purchaseOrderId,
  productId: purchaseOrderItemMock.productId,
  productVariationId: purchaseOrderItemMock.productVariationId,
  supplierProductCode: purchaseOrderItemMock.supplierProductCode,
  price: purchaseOrderItemMock.price,
  quantity: purchaseOrderItemMock.quantity,
  product_link: purchaseOrderItemMock.product_link,
};
