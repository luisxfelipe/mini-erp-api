import { PartialType } from '@nestjs/swagger';
import { CreateStockItemIdentifierTypeDto } from './create-stock-item-identifier-type.dto';

export class UpdateStockItemIdentifierTypeDto extends PartialType(
  CreateStockItemIdentifierTypeDto,
) {}
