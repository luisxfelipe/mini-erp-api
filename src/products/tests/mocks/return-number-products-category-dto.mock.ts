import { categoryMock } from '../../categories/tests/mocks/category.mock';
import { ReturnNumberProductsByCategoryDto } from '../../dto/return-number-products-category.dto';

export const returnNumberProductsByCategoryDtoMock: ReturnNumberProductsByCategoryDto =
  {
    category_id: categoryMock.id,
    numberProducts: undefined,
  };
