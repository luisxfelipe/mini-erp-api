import { PartialType } from '@nestjs/swagger';
import { CreateIntegrationProductSupplierErpDto } from './create-integration-product-supplier-erp.dto';

export class UpdateIntegrationProductSupplierErpDto extends PartialType(
  CreateIntegrationProductSupplierErpDto,
) {}
