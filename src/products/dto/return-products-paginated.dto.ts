import { Product } from '../entities/product.entity';

export class ReturnProductsPaginatedDto {
  products: Product[];

  total: number;

  constructor(products: Product[], total: number) {
    this.products = products;

    this.total = total;
  }
}
