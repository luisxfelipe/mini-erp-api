import { Module } from '@nestjs/common';
import { SalesOrdersService } from './sales-orders.service';
import { SalesOrdersController } from './sales-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalePlatform } from './sale-platforms/entities/sale-platform.entity';
import { SalePlatformsController } from './sale-platforms/sale-platforms.controller';
import { SalePlatformsService } from './sale-platforms/sale-platforms.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalePlatform])],
  controllers: [SalesOrdersController, SalePlatformsController],
  providers: [SalesOrdersService, SalePlatformsService],
})
export class SalesOrdersModule {}
