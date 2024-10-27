import { Module } from '@nestjs/common';
import { SalesPlatformCommissionsService } from './sales-platform-commissions.service';
import { SalesPlatformCommissionsController } from './sales-platform-commissions.controller';
import { SalesPlatformCommission } from './entities/sales-platform-commission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformsModule } from 'src/platforms/platforms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesPlatformCommission]),
    PlatformsModule,
  ],
  controllers: [SalesPlatformCommissionsController],
  providers: [SalesPlatformCommissionsService],
})
export class SalesPlatformCommissionsModule {}
