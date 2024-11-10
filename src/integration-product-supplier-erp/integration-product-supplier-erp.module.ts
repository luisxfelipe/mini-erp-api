import { Module } from '@nestjs/common';
import { IntegrationProductSupplierErpService } from './integration-product-supplier-erp.service';
import { IntegrationProductSupplierErpController } from './integration-product-supplier-erp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationProductSupplierErp } from './entities/integration-product-supplier-erp.entity';
import { ProductsModule } from 'src/products/products.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IntegrationProductSupplierErp]),
    ProductsModule,
    SuppliersModule,
  ],
  controllers: [IntegrationProductSupplierErpController],
  providers: [IntegrationProductSupplierErpService],
})
export class IntegrationProductSupplierErpModule {}
