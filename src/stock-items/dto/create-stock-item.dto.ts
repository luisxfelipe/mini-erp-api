import { IsDate, IsInt, IsOptional } from 'class-validator';

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

  @IsInt()
  batchNumber: number;

  @IsDate()
  @IsOptional()
  manufactureDate: Date;

  @IsDate()
  @IsOptional()
  expirationDate: Date;
}
