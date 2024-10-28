import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
