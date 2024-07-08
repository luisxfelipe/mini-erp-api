import { ReturnCategoryDto } from './../../categories/dto/return-category.dto';
import { Product } from '../entities/product.entity';

export class ReturnProductDto {
  id: number;
  name: string;
  category?: ReturnCategoryDto;
  description?: string;

  constructor(productEntity: Product) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.category = productEntity.category
      ? new ReturnCategoryDto(productEntity.category)
      : undefined;
    this.description = productEntity.description;
  }
}
