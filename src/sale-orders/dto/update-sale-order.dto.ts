import { PartialType } from '@nestjs/swagger';
import { CreateSaleOrderDto } from './create-sales-order.dto';

export class UpdateSaleOrderDto extends PartialType(CreateSaleOrderDto) {}
