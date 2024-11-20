import { IsInt } from 'class-validator';

export class FindPricingByProductPlatformDto {
  @IsInt()
  productId: number;

  @IsInt()
  productVariationId: number;

  @IsInt()
  salePlatformId: number;
}
