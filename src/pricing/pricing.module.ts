import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from './entities/pricing.entity';
import { PlatformsModule } from 'src/platforms/platforms.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pricing]),
    PlatformsModule,
    ProductsModule,
  ],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
