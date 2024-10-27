import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateSalesPlatformCommissionDto {
  @IsInt()
  salePlatformId: number;

  @IsInt()
  @IsPositive({ message: 'Commission percentage must be a positive number' })
  commissionPercentage: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Max commission must be a positive number' })
  @IsOptional()
  maxCommission: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Cost per item sold must be a positive number' })
  @IsOptional()
  costPerItemSold: number;

  @IsInt()
  @IsPositive({
    message: 'Default profit percentage must be a positive number',
  })
  defaultProfitPercentage: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Additional profit must be a positive number' })
  @IsOptional()
  additionalProfit: number;
}
