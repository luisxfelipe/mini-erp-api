import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStockItemIdentifierTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
