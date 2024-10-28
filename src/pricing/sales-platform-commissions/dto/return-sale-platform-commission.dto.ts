import { ReturnPlatformDto } from 'src/platforms/dto/return-platform.dto';
import { SalesPlatformCommission } from '../entities/sales-platform-commission.entity';

export class ReturnSalePlatformCommissionDto {
  id: number;
  salePlatform?: ReturnPlatformDto;
  commissionPercentage: number;
  costPerItemSold?: number;
  defaultProfitPercentage: number;
  additionalProfit?: number;

  constructor(entity: SalesPlatformCommission) {
    this.id = entity.id;
    this.salePlatform = entity.salePlatform
      ? new ReturnPlatformDto(entity.salePlatform)
      : undefined;
    this.commissionPercentage = entity.commissionPercentage;
    this.costPerItemSold = entity.costPerItemSold
      ? entity.costPerItemSold
      : undefined;
    this.defaultProfitPercentage = entity.defaultProfitPercentage;
    this.additionalProfit = entity.additionalProfit
      ? entity.additionalProfit
      : undefined;
  }
}
