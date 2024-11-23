import { Module } from '@nestjs/common';
import { IntegrationProductSupplierErpService } from './integration-product-supplier-erp.service';
import { IntegrationProductSupplierErpController } from './integration-product-supplier-erp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationProductSupplierErp } from './entities/integration-product-supplier-erp.entity';
import { ProductsModule } from 'src/products/products.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { IntegrationStatusController } from './integration-status/integration-status.controller';
import { IntegrationStatus } from './integration-status/entities/integration-status.entity';
import { IntegrationStatusService } from './integration-status/integration-status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IntegrationProductSupplierErp,
      IntegrationStatus,
    ]),
    ProductsModule,
    SuppliersModule,
  ],
  controllers: [
    IntegrationProductSupplierErpController,
    IntegrationStatusController,
  ],
  providers: [IntegrationProductSupplierErpService, IntegrationStatusService],
})
export class IntegrationProductSupplierErpModule {}
