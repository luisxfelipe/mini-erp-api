import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateStockItemIdentifierDto {
  @IsInt()
  stockItemIdentifierTypeId: number;

  @IsString()
  @IsNotEmpty()
  value: string;
}
