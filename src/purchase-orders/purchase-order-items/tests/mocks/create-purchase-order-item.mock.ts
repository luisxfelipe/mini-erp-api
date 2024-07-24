import { productMock } from './../../../../products/tests/mocks/product.mock';
import { CreatePurchaseOrderItemDto } from '../../dto/create-purchase-order-item.dto';
import { productVariationMock } from './../../../../products/product-variations/tests/mocks/product-variation.mock';

export const createPurchaseOrderItemMock: CreatePurchaseOrderItemDto = {
  productId: productMock.id,
  productVariationId: productVariationMock.id,
  supplierProductCode: '12707070',
  price: 48.97,
  quantity: 3,
  product_link: 'https://www.amazon.com.br/dp/B07YXB2345',
};
