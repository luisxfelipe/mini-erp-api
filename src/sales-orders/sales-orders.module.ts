import { Module } from '@nestjs/common';
import { SalesOrdersService } from './sales-orders.service';
import { SalesOrdersController } from './sales-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalePlatform } from './sale-platforms/entities/sale-platform.entity';
import { SalePlatformsController } from './sale-platforms/sale-platforms.controller';
import { SalePlatformsService } from './sale-platforms/sale-platforms.service';
import { SaleOrder } from './entities/sales-order.entity';
import { SaleStatus } from './sale-status/entities/sale-status.entity';
import { SaleStatusService } from './sale-status/sale-status.service';
import { SaleStatusController } from './sale-status/sale-status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaleOrder, SalePlatform, SaleStatus])],
  controllers: [
    SalesOrdersController,
    SalePlatformsController,
    SaleStatusController,
  ],
  providers: [SalesOrdersService, SalePlatformsService, SaleStatusService],
})
export class SalesOrdersModule {}
