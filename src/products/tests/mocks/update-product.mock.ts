import { categoryMock } from '../../categories/tests/mocks/category.mock';
import { UpdateProductDto } from '../../dto/update-product.dto';

export const updateProductMock: UpdateProductDto = {
  name: 'Product 01',
  categoryId: categoryMock.id,
  description: 'Descrição Teste 01',
};
