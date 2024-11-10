import { PartialType } from '@nestjs/swagger';
import { CreateStockItemStatusDto } from './create-stock-item-status.dto';

export class UpdateStockItemStatusDto extends PartialType(
  CreateStockItemStatusDto,
) {}
