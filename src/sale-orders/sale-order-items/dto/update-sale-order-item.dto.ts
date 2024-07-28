import { PartialType } from '@nestjs/swagger';
import { CreateSaleOrderItemDto } from './create-sale-order-item.dto';

export class UpdateSaleOrderItemDto extends PartialType(
  CreateSaleOrderItemDto,
) {}
