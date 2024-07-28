import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseOrderRefundDto } from './create-purchase-order-refund.dto';

export class UpdatePurchaseOrderRefundDto extends PartialType(
  CreatePurchaseOrderRefundDto,
) {}
