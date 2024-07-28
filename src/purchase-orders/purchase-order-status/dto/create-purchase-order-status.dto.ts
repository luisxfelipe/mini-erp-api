import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePurchaseOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
