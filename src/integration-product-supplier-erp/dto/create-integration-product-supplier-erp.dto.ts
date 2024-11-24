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
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  productVariationId: number;

  @IsNumber()
  supplierId: number;

  @IsString()
  @IsNotEmpty()
  supplierProductCode: string;

  @IsNumber()
  @IsPositive()
  statusId: number;

  @IsBoolean()
  inStockInTheSupplier: boolean;

  @IsString()
  @IsOptional()
  supplierProductLink: string;

  @IsNumber()
  blingProductId: number;
}
