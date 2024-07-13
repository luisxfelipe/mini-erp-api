import { categoryMock } from '../../categories/tests/mocks/category.mock';
import { CreateProductDto } from '../../dto/create-product.dto';

export const createProductMock: CreateProductDto = {
  name: 'Product 1',
  categoryId: categoryMock.id,
  description: 'Descrição Teste',
};
