import { IsString } from 'class-validator';

export class CreateSalePlatformDto {
  @IsString()
  name: string;
}
