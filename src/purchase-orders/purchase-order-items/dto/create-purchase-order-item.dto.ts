import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePurchaseOrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  productVariationId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  supplierProductCode: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsInt()
  purchaseOrderItemStatusId: number;

  @IsUrl()
  @IsOptional()
  productLink: string;
}
