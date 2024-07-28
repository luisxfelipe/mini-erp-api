import { Module } from '@nestjs/common';
import { StockItemsService } from './stock-items.service';
import { StockItemsController } from './stock-items.controller';
import { StockItemStatus } from './stock-item-status/entities/stock-item-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockItemStatusController } from './stock-item-status/stock-item-status.controller';
import { StockItemStatusService } from './stock-item-status/stock-item-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockItemStatus])],
  controllers: [StockItemsController, StockItemStatusController],
  providers: [StockItemsService, StockItemStatusService],
})
export class StockItemsModule {}
