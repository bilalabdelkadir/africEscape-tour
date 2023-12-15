import { Module } from '@nestjs/common';
import { EmployeeInvitationService } from './employee_invitation.service';
import { EmployeeInvitationController } from './employee_invitation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [EmployeeInvitationController],
  providers: [EmployeeInvitationService],
  imports: [AuthModule, MailModule],
})
export class EmployeeInvitationModule {}
