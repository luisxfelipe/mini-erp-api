import { ReturnProductDto } from 'src/products/dto/return-product.dto';

import { ReturnProductVariationDto } from 'src/products/product-variations/dto/return-product-variation.dto';

import { ReturnSupplierDto } from 'src/suppliers/dto/return-supplier.dto';
import { SupplierProductCode } from '../entities/supplier-product-code.entity';

export class ReturnSupplierProductCodeDto {
  id: number;
  product?: ReturnProductDto;
  productVariation?: ReturnProductVariationDto;
  supplier?: ReturnSupplierDto;
  supplierProductCode: string;
  link?: string;

  constructor(entity: SupplierProductCode) {
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
    this.link = entity.link ? entity.link : undefined;
  }
}
