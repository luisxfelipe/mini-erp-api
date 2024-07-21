import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseOrderStatusDto } from './create-purchase-order-status.dto';

export class UpdatePurchaseOrderStatusDto extends PartialType(CreatePurchaseOrderStatusDto) {}
