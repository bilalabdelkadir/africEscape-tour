import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeInvitationDto } from './create-employee_invitation.dto';

export class UpdateEmployeeInvitationDto extends PartialType(CreateEmployeeInvitationDto) {}
