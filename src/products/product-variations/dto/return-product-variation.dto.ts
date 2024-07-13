import { ReturnProductDto } from './../../../products/dto/return-product.dto';
import { ProductVariation } from '../entities/product-variation.entity';

export class ReturnProductVariationDto {
  id: number;
  name: string;
  product?: ReturnProductDto;

  constructor(productVariationEntity: ProductVariation) {
    this.id = productVariationEntity.id;
    this.name = productVariationEntity.name;
    this.product = productVariationEntity.product
      ? new ReturnProductDto(productVariationEntity.product)
      : undefined;
  }
}
