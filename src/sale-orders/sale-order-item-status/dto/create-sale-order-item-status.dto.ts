import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSaleOrderItemStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
