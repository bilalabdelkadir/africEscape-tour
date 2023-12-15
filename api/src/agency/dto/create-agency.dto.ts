import { PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { SignupEmployeeDto } from 'src/auth/dto/create-auth.dto';

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
