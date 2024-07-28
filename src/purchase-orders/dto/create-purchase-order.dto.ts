import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsInt()
  supplierId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  orderNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  trackingCode: string;

  @IsInt()
  purchaseOrderStatusId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Discount must be a positive number' })
  @IsOptional()
  discount: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Shipping cost must be a positive number' })
  @IsOptional()
  shippingCost: number;
}
