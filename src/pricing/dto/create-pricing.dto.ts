import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

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

  @IsInt()
  @IsPositive({
    message: 'Profit percentage must be a positive number',
  })
  profitPercentage: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Additional profit must be a positive number' })
  @IsOptional()
  additionalProfit: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Sale price must be a positive number' })
  salePrice: number;
}
