import { PartialType } from '@nestjs/swagger';
import { CreateStockItemIdentifierDto } from './create-stock-item-identifier.dto';

export class UpdateStockItemIdentifierDto extends PartialType(CreateStockItemIdentifierDto) {}
