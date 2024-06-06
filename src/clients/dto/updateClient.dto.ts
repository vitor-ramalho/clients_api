import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

class AddressDto {
  @IsOptional()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  zip_code: string;

  @IsOptional()
  @IsString()
  district: string;
}

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  address: AddressDto;

  @IsOptional()
  phoneNumbers: string[];

  @IsOptional()
  @IsEnum(['Single', 'Married', 'Divorced', 'Widowed'])
  maritalStatus: string;
}
