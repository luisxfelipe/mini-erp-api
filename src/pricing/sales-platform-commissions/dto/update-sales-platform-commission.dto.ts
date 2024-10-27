import { PartialType } from '@nestjs/swagger';
import { CreateSalesPlatformCommissionDto } from './create-sales-platform-commission.dto';

export class UpdateSalesPlatformCommissionDto extends PartialType(
  CreateSalesPlatformCommissionDto,
) {}
