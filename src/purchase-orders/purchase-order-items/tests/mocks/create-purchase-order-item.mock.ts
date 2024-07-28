import { productMock } from './../../../../products/tests/mocks/product.mock';
import { CreatePurchaseOrderItemDto } from '../../dto/create-purchase-order-item.dto';
import { productVariationMock } from './../../../../products/product-variations/tests/mocks/product-variation.mock';
import { purchaseOrderItemStatusMock } from './../../../../purchase-orders/purchase-order-item-status/tests/mocks/purchase-order-item-status.mock';

export const createPurchaseOrderItemMock: CreatePurchaseOrderItemDto = {
  productId: productMock.id,
  productVariationId: productVariationMock.id,
  supplierProductCode: '12707070',
  purchaseOrderItemStatusId: purchaseOrderItemStatusMock.id,
  price: 48.97,
  product_link: 'https://www.amazon.com.br/dp/B07YXB2345',
};
