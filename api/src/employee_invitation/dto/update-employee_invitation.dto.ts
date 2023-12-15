import { PartialType } from '@nestjs/swagger';
import { SignupEmployeeDto } from 'src/auth/dto/create-auth.dto';

export class UpdateEmployeeInvitationDto extends PartialType(
  SignupEmployeeDto,
) {}
