import { purchaseOrderMock } from './../../../../purchase-orders/tests/mocks/purchase-order.mock';
import { PurchaseOrderItem } from '../../entities/purchase-order-item.entity';
import { productMock } from './../../../../products/tests/mocks/product.mock';
import { productVariationMock } from './../../../../products/product-variations/tests/mocks/product-variation.mock';
import { purchaseOrderItemStatusMock } from './../../../../purchase-orders/purchase-order-item-status/tests/mocks/purchase-order-item-status.mock';
export const purchaseOrderItemMock: PurchaseOrderItem = {
  id: 1,
  purchaseOrderId: purchaseOrderMock.id,
  productId: productMock.id,
  productVariationId: productVariationMock.id,
  supplierProductCode: '12707070',
  purchaseOrderItemStatusId: purchaseOrderItemStatusMock.id,
  price: 48.97,
  productLink: 'https://www.amazon.com.br/dp/B07YXB2345',
  createdAt: new Date(),
  updatedAt: new Date(),
};
