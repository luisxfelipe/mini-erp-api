import { PaginationDto } from '../../../dtos/pagination.dto';
import { Product } from '../../entities/product.entity';
import { categoryMock } from '../../categories/tests/mocks/category.mock';

export const productMock: Product = {
  id: 1,
  name: 'Product 1',
  categoryId: categoryMock.id,
  description: 'Descrição 1',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const paginationProductMock: PaginationDto<Product[]> = {
  data: [productMock],
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 10,
    totalPages: 1,
  },
};
