import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  corporateName: string;

  @IsString()
  tradeName: string;

  @IsString()
  @IsOptional()
  cnpj: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  website: string;
}
