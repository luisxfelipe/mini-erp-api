import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateSalePriceDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Cost price must be a positive number' })
  costPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Additional profit must be a positive number' })
  @IsOptional()
  additionalProfit: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Cost per item sold must be a positive number' })
  @IsOptional()
  costPerItemSold: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Profit percentage must be a positive number' })
  @IsOptional()
  profitPercentage: number;

  @IsNumber()
  @IsPositive({ message: 'Pricing id must be a positive number' })
  pricingId: number;
}
