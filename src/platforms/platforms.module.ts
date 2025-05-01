import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from './entities/platform.entity';
import { PlatformsController } from './platforms.controller';
import { PlatformsService } from './platforms.service';
import { SaleOrdersModule } from 'src/sale-orders/sale-orders.module';
import { SalesPlatformCommissionsModule } from 'src/pricing/sales-platform-commissions/sales-platform-commissions.module';
import { PricingModule } from 'src/pricing/pricing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Platform]), forwardRef(() => PricingModule), forwardRef(() => SaleOrdersModule), forwardRef(() => SalesPlatformCommissionsModule)],
  controllers: [PlatformsController],
  providers: [PlatformsService],
  exports: [PlatformsService],
})
export class PlatformsModule { }
