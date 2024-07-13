import { IsNumber, IsString } from 'class-validator';

export class CreateProductVariationDto {
  @IsString()
  name: string;

  @IsNumber()
  productId: number;
}
