import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsString()
  @IsOptional()
  description?: string;
}
