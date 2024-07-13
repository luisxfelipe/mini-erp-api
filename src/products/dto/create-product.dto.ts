import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  categoryId: number;

  @IsString()
  @IsOptional()
  description?: string;
}
