import { ProductVariation } from '../entities/product-variation.entity';

export class ReturnProductVariationDto {
  id: number;
  name: string;
  productId: number;

  constructor(productVariationEntity: ProductVariation) {
    this.id = productVariationEntity.id;
    this.name = productVariationEntity.name;
    this.productId = productVariationEntity.productId;
  }
}
