import { productMock } from './../../../../products/tests/mocks/product.mock';
import { ProductVariation } from '../../entities/product-variation.entity';

export const productVariationMock: ProductVariation = {
  id: 1,
  name: 'Product Variation 1',
  productId: productMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
