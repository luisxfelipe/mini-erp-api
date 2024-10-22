import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateStockItemDto {
  @IsInt()
  purchaseOrderItemId: number;

  @IsInt()
  productId: number;

  @IsInt()
  productVariationId: number;

  @IsInt()
  @IsOptional()
  saleOrderItemId: number;

  @IsInt()
  stockItemStatusId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  identifier?: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  identifierTypeId?: number;
}
