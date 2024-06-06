import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsCPF } from 'src/validation/is-cpf.validator';

class AddressDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @IsNotEmpty()
  @IsString()
  district: string;
}

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  @IsCPF({ message: 'Invalid CPF' })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  maritalStatus: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsArray()
  @IsOptional()
  phoneNumbers: string[];
}
