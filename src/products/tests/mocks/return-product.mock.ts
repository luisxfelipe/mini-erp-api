import { ReturnProductDto } from './../../dto/return-product.dto';
import { productMock } from './product.mock';

export const returnProductMock: ReturnProductDto = {
  id: productMock.id,
  category: undefined,
  name: productMock.name,
  description: productMock.description,
};
