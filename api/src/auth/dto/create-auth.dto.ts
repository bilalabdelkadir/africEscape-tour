import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

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
