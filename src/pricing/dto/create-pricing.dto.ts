import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreatePricingDto {
  @IsInt()
  productId: number;

  @IsInt()
  productVariationId: number;

  @IsInt()
  salePlatformId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Cost price must be a positive number' })
  costPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Sale price must be a positive number' })
  salePrice: number;
}
