import { Module } from '@nestjs/common';
import { SupplierProductCodesService } from './supplier-product-codes.service';
import { SupplierProductCodesController } from './supplier-product-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierProductCode } from './entities/supplier-product-code.entity';
import { ProductsModule } from 'src/products/products.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierProductCode]),
    ProductsModule,
    SuppliersModule,
  ],
  controllers: [SupplierProductCodesController],
  providers: [SupplierProductCodesService],
})
export class SupplierProductCodesModule {}
