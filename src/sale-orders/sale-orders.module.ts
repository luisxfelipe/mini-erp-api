import { Module } from '@nestjs/common';
import { SaleOrdersService } from './sale-orders.service';
import { SaleOrdersController } from './sale-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleOrder } from './entities/sale-order.entity';
import { SaleStatus } from './sale-status/entities/sale-status.entity';
import { SaleStatusService } from './sale-status/sale-status.service';
import { SaleStatusController } from './sale-status/sale-status.controller';
import { SaleOrderItem } from './sale-order-items/entities/sale-order-item.entity';
import { SaleOrderItemsService } from './sale-order-items/sale-order-items.service';
import { SaleOrderItemsController } from './sale-order-items/sale-order-items.controller';
import { ProductsModule } from './../products/products.module';
import { SaleOrderRefund } from './sale-order-refunds/entities/sale-order-refund.entity';
import { SaleOrderRefundsController } from './sale-order-refunds/sale-order-refunds.controller';
import { SaleOrderRefundsService } from './sale-order-refunds/sale-order-refunds.service';
import { SaleOrderItemStatus } from './sale-order-item-status/entities/sale-order-item-status.entity';
import { SaleOrderItemStatusController } from './sale-order-item-status/sale-order-item-status.controller';
import { SaleOrderItemStatusService } from './sale-order-item-status/sale-order-item-status.service';
import { PlatformsModule } from 'src/platforms/platforms.module';
import { StockItemsModule } from 'src/stock-items/stock-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SaleOrder,
      SaleOrderItem,
      SaleOrderItemStatus,
      SaleOrderRefund,
      SaleStatus,
    ]),
    PlatformsModule,
    ProductsModule,
    StockItemsModule,
  ],
  controllers: [
    SaleOrdersController,
    SaleOrderItemsController,
    SaleOrderItemStatusController,
    SaleOrderRefundsController,
    SaleStatusController,
  ],
  providers: [
    SaleOrdersService,
    SaleOrderItemsService,
    SaleOrderItemStatusService,
    SaleOrderRefundsService,
    SaleStatusService,
  ],
  exports: [SaleOrdersService, SaleOrderItemsService],
})
export class SaleOrdersModule { }
