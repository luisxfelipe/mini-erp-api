import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseOrderItemStatusDto } from './create-purchase-order-item-status.dto';

export class UpdatePurchaseOrderItemStatusDto extends PartialType(CreatePurchaseOrderItemStatusDto) {}
