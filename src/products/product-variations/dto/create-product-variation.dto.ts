import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductVariationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  productId: number;
}
