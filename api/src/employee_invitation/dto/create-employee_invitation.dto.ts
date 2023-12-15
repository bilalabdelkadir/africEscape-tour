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
