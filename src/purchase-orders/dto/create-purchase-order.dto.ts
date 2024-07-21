import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsInt()
  supplierId: number;

  @IsString()
  @IsOptional()
  orderNumber: string;

  @IsString()
  @IsOptional()
  trackingCode: string;

  @IsInt()
  purchaseOrderStatusId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsOptional()
  shippingCost: number;
}
