import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductVariationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
