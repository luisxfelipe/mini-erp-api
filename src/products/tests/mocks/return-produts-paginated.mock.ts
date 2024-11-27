import { ReturnPaginatedDto } from 'src/dtos/return-paginated.dto';

import { productMock } from './product.mock';
import { Product } from 'src/products/entities/product.entity';

export const returnProductsPaginatedMock: ReturnPaginatedDto<Product> = {
  data: [productMock],
  total: 1,
};
