import { Module } from '@nestjs/common';
import { StockItemsService } from './stock-items.service';
import { StockItemsController } from './stock-items.controller';
import { StockItemStatus } from './stock-item-status/entities/stock-item-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockItemStatusController } from './stock-item-status/stock-item-status.controller';
import { StockItemStatusService } from './stock-item-status/stock-item-status.service';
import { StockItemIdentifierType } from './stock-item-identifier-types/entities/stock-item-identifier-type.entity';
import { StockItem } from './entities/stock-item.entity';
import { StockItemIdentifierTypesController } from './stock-item-identifier-types/stock-item-identifier-types.controller';
import { StockItemIdentifierTypesService } from './stock-item-identifier-types/stock-item-identifier-types.service';
import { PurchaseOrdersModule } from './../purchase-orders/purchase-orders.module';
import { ProductsModule } from './../products/products.module';
import { SaleOrdersModule } from './../sale-orders/sale-orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockItem,
      StockItemIdentifierType,
      StockItemStatus,
    ]),
    ProductsModule,
    PurchaseOrdersModule,
    SaleOrdersModule,
  ],
  controllers: [
    StockItemsController,
    StockItemIdentifierTypesController,
    StockItemStatusController,
  ],
  providers: [
    StockItemsService,
    StockItemIdentifierTypesService,
    StockItemStatusService,
  ],
})
export class StockItemsModule {}
