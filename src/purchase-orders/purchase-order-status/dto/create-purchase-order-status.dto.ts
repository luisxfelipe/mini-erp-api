import { IsString } from 'class-validator';

export class CreatePurchaseOrderStatusDto {
  @IsString()
  name: string;
}
