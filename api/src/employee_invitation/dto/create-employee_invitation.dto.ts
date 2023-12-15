import { ApiProperty } from '@nestjs/swagger';
import { EmployeeRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateInvitationDto {
  @IsEmail()
  email: string;
}

export class CreateEmployeeInvitationDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'zeemades@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+251911111111',
  })
  @IsPhoneNumber('ET')
  phoneNumber: string;

  @ApiProperty({
    example: 'Addis Ababa',
  })
  @IsOptional()
  @IsString()
  stateRegion?: string;

  @ApiProperty({
    example: 'Ethiopia',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Addis Ababa',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'Addis Ababa',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: EmployeeRole.GUIDE,
    enum: EmployeeRole,
  })
  @IsEnum(EmployeeRole)
  role: EmployeeRole;
}
