import { Module } from '@nestjs/common';
import { StockItemsService } from './stock-items.service';
import { StockItemsController } from './stock-items.controller';
import { StockItemStatus } from './stock-item-status/entities/stock-item-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockItemStatusController } from './stock-item-status/stock-item-status.controller';
import { StockItemStatusService } from './stock-item-status/stock-item-status.service';
import { StockItemIdentifierType } from './stock-item-identifier-type/entities/stock-item-identifier-type.entity';
import { StockItem } from './entities/stock-item.entity';
import { StockItemIdentifierTypeController } from './stock-item-identifier-type/stock-item-identifier-type.controller';
import { StockItemIdentifierTypeService } from './stock-item-identifier-type/stock-item-identifier-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockItemIdentifierType,
      StockItem,
      StockItemStatus,
    ]),
  ],
  controllers: [
    StockItemsController,
    StockItemIdentifierTypeController,
    StockItemStatusController,
  ],
  providers: [
    StockItemsService,
    StockItemIdentifierTypeService,
    StockItemStatusService,
  ],
})
export class StockItemsModule {}
