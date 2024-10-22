import { IsInt, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  identifier: string;

  @IsInt()
  @IsOptional()
  identifierTypeId: number;
}
