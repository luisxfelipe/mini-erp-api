import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSalePlatformDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
