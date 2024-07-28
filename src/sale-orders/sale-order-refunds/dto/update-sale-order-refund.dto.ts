import { PartialType } from '@nestjs/swagger';
import { CreateSaleOrderRefundDto } from './create-sale-order-refund.dto';

export class UpdateSaleOrderRefundDto extends PartialType(
  CreateSaleOrderRefundDto,
) {}
