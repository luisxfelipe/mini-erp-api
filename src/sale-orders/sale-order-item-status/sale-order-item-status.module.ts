import { Module } from '@nestjs/common';
import { SaleOrderItemStatusService } from './sale-order-item-status.service';
import { SaleOrderItemStatusController } from './sale-order-item-status.controller';

@Module({
  controllers: [SaleOrderItemStatusController],
  providers: [SaleOrderItemStatusService],
})
export class SaleOrderItemStatusModule {}
