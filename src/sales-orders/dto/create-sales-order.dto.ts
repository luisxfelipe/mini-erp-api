import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSalesOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  orderNumber: string;

  @IsString()
  @IsOptional()
  trackingCode: string;

  @IsInt()
  platformId: number;

  @IsInt()
  statusId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  discount: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  shippingCost: number;
}
