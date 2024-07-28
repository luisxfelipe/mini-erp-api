import { productMock } from './../../../../products/tests/mocks/product.mock';
import { CreateSaleOrderItemDto } from '../../dto/create-sale-order-item.dto';
import { productVariationMock } from './../../../../products/product-variations/tests/mocks/product-variation.mock';

export const createSaleOrderItemMock: CreateSaleOrderItemDto = {
  productId: productMock.id,
  productVariationId: productVariationMock.id,
  price: 48.97,
  quantity: 3,
};
