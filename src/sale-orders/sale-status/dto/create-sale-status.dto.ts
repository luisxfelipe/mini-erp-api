import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSaleStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
