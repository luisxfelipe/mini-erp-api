import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStockItemStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
