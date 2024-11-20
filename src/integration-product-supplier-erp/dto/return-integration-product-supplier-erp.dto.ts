import { ReturnProductDto } from 'src/products/dto/return-product.dto';

import { ReturnProductVariationDto } from 'src/products/product-variations/dto/return-product-variation.dto';

import { ReturnSupplierDto } from 'src/suppliers/dto/return-supplier.dto';
import { IntegrationProductSupplierErp } from '../entities/integration-product-supplier-erp.entity';

export class ReturnIntegrationProductSupplierErpDto {
  id: number;
  product?: ReturnProductDto;
  productVariation?: ReturnProductVariationDto;
  supplier?: ReturnSupplierDto;
  supplierProductCode: string;
  inStockInTheSupplier: boolean;
  supplierProductLink?: string;
  blingProductId: number;

  constructor(entity: IntegrationProductSupplierErp) {
    this.id = entity.id;
    this.product = entity.product
      ? new ReturnProductDto(entity.product)
      : undefined;
    this.productVariation = entity.productVariation
      ? new ReturnProductVariationDto(entity.productVariation)
      : undefined;
    this.supplier = entity.supplier
      ? new ReturnSupplierDto(entity.supplier)
      : undefined;
    this.supplierProductCode = entity.supplierProductCode;
    this.inStockInTheSupplier = entity.inStockInTheSupplier;
    this.supplierProductLink = entity.supplierProductLink
      ? entity.supplierProductLink
      : undefined;
    this.blingProductId = entity.blingProductId;
  }
}
