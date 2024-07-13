import { productMock } from './../../../tests/mocks/product.mock';
import { UpdateProductVariationDto } from './../../dto/update-product-variation.dto';

export const updateProductVariationMock: UpdateProductVariationDto = {
  name: 'Product 01',
  productId: productMock.id,
};
