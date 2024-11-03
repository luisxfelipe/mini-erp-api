import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSupplierProductCodeDto {
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
