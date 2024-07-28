import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsOptional()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
