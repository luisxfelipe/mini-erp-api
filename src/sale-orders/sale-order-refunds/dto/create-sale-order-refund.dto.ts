import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateSaleOrderRefundDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
