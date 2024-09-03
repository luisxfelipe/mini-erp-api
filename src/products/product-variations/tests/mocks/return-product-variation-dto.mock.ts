import { ReturnProductVariationDto } from '../../dto/return-product-variation.dto';
import { productVariationMock } from './product-variation.mock';

export const returnProductVariationDtoMock: ReturnProductVariationDto = {
  id: productVariationMock.id,
  name: productVariationMock.name,
  productId: productVariationMock.productId,
};
