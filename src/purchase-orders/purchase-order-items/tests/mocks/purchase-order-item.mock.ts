import { purchaseOrderMock } from './../../../../purchase-orders/tests/mocks/purchase-order.mock';
import { PurchaseOrderItem } from '../../entities/purchase-order-item.entity';
import { productMock } from './../../../../products/tests/mocks/product.mock';
import { productVariationMock } from './../../../../products/product-variations/tests/mocks/product-variation.mock';
export const purchaseOrderItemMock: PurchaseOrderItem = {
  id: 1,
  purchaseOrderId: purchaseOrderMock.id,
  productId: productMock.id,
  productVariationId: productVariationMock.id,
  supplierProductCode: '12707070',
  price: 48.97,
  quantity: 3,
  product_link: 'https://www.amazon.com.br/dp/B07YXB2345',
  createdAt: new Date(),
  updatedAt: new Date(),
};
