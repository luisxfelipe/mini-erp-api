import { ReturnProductsPaginatedDto } from '../../dto/return-products-paginated.dto';

import { productMock } from './product.mock';

export const returnProductsPaginatedMock: ReturnProductsPaginatedDto = {
  products: [productMock],
  total: 1,
};
