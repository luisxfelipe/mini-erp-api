import { ReturnProductDto } from '../../dto/return-product.dto';
import { Category } from '../entities/category.entity';

export class ReturnCategoryDto {
  id: number;
  name: string;
  products?: ReturnProductDto[];

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.products = category.products
      ? category.products.map((product) => new ReturnProductDto(product))
      : undefined;
  }
}
