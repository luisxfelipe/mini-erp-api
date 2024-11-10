import { PartialType } from '@nestjs/swagger';
import { CreateStockItemDto } from './create-stock-item.dto';

export class UpdateStockItemDto extends PartialType(CreateStockItemDto) {}
