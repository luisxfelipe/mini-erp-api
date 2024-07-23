import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreatePurchaseOrderItemDto {
  /*@IsInt()
  purchaseOrderId: number;*/

  @IsInt()
  productId: number;

  @IsInt()
  productVariationId: number;

  @IsString()
  @IsOptional()
  supplierProductCode: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsInt()
  @Min(1, { message: 'The quantity must be greater than 0' })
  quantity: number;

  @IsUrl()
  @IsOptional()
  product_link: string;
}