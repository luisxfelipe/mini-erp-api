import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateSaleOrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  productVariationId: number;

  @IsInt()
  saleOrderItemStatusId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}
