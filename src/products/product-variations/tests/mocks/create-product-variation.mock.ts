import { productMock } from './../../../tests/mocks/product.mock';
import { CreateProductVariationDto } from '../../dto/create-product-variation.dto';

export const createProductVariationMock: CreateProductVariationDto = {
  name: 'Product Variation 1',
  productId: productMock.id,
};
