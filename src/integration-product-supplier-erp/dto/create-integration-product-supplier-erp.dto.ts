import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateIntegrationProductSupplierErpDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  productVariationId: number;

  @IsNumber()
  supplierId: number;

  @IsString()
  @IsNotEmpty()
  supplierProductCode: string;

  @IsBoolean()
  inStockInTheSupplier: boolean;

  @IsString()
  @IsOptional()
  supplierProductLink: string;

  @IsNumber()
  blingProductId: number;
}
