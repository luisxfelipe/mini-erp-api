import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateSaleOrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  productVariationId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsInt()
  @Min(1, { message: 'The quantity must be greater than 0' })
  quantity: number;
}
