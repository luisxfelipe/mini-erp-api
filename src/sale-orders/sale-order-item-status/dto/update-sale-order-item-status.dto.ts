import { PartialType } from '@nestjs/swagger';
import { CreateSaleOrderItemStatusDto } from './create-sale-order-item-status.dto';

export class UpdateSaleOrderItemStatusDto extends PartialType(
  CreateSaleOrderItemStatusDto,
) {}
