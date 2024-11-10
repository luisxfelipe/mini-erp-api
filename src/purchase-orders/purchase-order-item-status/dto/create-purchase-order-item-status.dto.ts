import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePurchaseOrderItemStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
