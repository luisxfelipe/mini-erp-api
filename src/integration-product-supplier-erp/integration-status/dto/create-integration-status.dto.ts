import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIntegrationStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
