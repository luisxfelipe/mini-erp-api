import { PartialType } from '@nestjs/swagger';
import { CreateSaleStatusDto } from './create-sale-status.dto';

export class UpdateSaleStatusDto extends PartialType(CreateSaleStatusDto) {}
