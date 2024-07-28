import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSaleOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  orderNumber: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  trackingCode: string;

  @IsInt()
  platformId: number;

  @IsInt()
  statusId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be a positive number' })
  @IsOptional()
  discount: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be a positive number' })
  @IsOptional()
  shippingCost: number;
}
