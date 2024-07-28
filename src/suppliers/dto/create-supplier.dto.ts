import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  corporateName: string;

  @IsString()
  @IsNotEmpty()
  tradeName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cnpj: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  phone: string;

  @IsUrl()
  @IsOptional()
  website: string;
}
