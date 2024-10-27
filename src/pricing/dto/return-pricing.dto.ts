import { ReturnProductDto } from 'src/products/dto/return-product.dto';
import { ReturnProductVariationDto } from 'src/products/product-variations/dto/return-product-variation.dto';
import { Pricing } from '../entities/pricing.entity';
import { ReturnPlatformDto } from 'src/platforms/dto/return-platform.dto';

export class ReturnPricingDto {
  id: number;
  product?: ReturnProductDto;
  productVariation?: ReturnProductVariationDto;
  salePlatform?: ReturnPlatformDto;
  costPrice: number;
  salePrice: number;

  constructor(entity: Pricing) {
    this.id = entity.id;
    this.product = entity.product
      ? new ReturnProductDto(entity.product)
      : undefined;
    this.productVariation = entity.productVariation
      ? new ReturnProductVariationDto(entity.productVariation)
      : undefined;
    this.salePlatform = entity.salePlatform
      ? new ReturnPlatformDto(entity.salePlatform)
      : undefined;
    this.costPrice = entity.costPrice;
    this.salePrice = entity.salePrice;
  }
}
