import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAuthDto {}

export class SignupTouristDto {
  @ApiProperty({
    example: 'example@email.com',
    description: 'The email of the user',
    format: 'email',
  })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address',
    },
  )
  email: string;

  @ApiProperty({
    example: 'Strong2030??',
    description: 'The password of the user',
    minLength: 7,
    format: 'password',
  })
  @IsStrongPassword(
    {
      minLength: 7,
    },
    {
      message:
        'Password must be at least 7 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
    },
  )
  password: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  @IsString({
    message: 'Please provide a valid first name',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  @IsString({
    message: 'Please provide a valid last name',
  })
  lastName: string;
}

export class SigninTouristDto {
  @ApiProperty({
    example: 'example@email.com',
    description: 'The email of the user',
    format: 'email',
  })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address',
    },
  )
  email: string;

  @ApiProperty({
    example: 'Strong2030??',
    description: 'The password of the user',
    minLength: 7,
    format: 'password',
  })
  @IsStrongPassword(
    {
      minLength: 7,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    },
    {
      message:
        'Password must be at least 7 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
    },
  )
  password: string;
}

export class SignupAgencyDto {
  @ApiProperty({
    example: 'tourcomapn@gmail.com',
    description: 'The email of the company',
    format: 'email',
  })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address',
    },
  )
  email: string;

  @ApiProperty({
    example: 'Strong2030??',
    description: 'The password of the company',
    minLength: 7,
    format: 'password',
  })
  @IsStrongPassword(
    {
      minLength: 7,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    },
    {
      message:
        'Password must be at least 7 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
    },
  )
  password: string;

  @ApiProperty({
    example: 'test company',
    description: 'The first name of the company',
  })
  @IsString({
    message: 'Please provide a valid first name',
  })
  agencyName: string;

  @ApiProperty({
    example: 'Ethiopia',
    description: 'The country of the company',
  })
  @IsString({
    message: 'Please provide a valid country',
  })
  country: string;

  @ApiProperty({
    example: 'Addis Ababa',
    description: 'The city of the company',
  })
  @IsString({
    message: 'Please provide a valid city',
  })
  city: string;

  @ApiProperty({
    example: '0912345678',
    description: 'The phone number of the company',
  })
  @IsString({
    message: 'Please provide a valid phone number',
  })
  phoneNumber: string;

  @IsOptional()
  @ApiProperty({
    example: 'algeria s.t',
    description: 'The street of the company',
  })
  @IsString({
    message: 'Please provide a valid street',
  })
  address: string;
}
