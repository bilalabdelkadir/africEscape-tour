import { IsEmail, IsString } from 'class-validator';

export class CreateAgencyDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  agencyName: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  country: string;

  @IsString()
  city: string;
}
