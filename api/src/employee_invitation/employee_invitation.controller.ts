import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmployeeInvitationService } from './employee_invitation.service';
import { CreateInvitationDto } from './dto/create-employee_invitation.dto';
import { ApiTags } from '@nestjs/swagger';
import { CheckAccountType } from 'src/auth/decorators/AccountTypeChecker';
import { AccountType } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@ApiTags('employee-invitation')
@Controller('employee-invitation')
export class EmployeeInvitationController {
  constructor(
    private readonly employeeInvitationService: EmployeeInvitationService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @CheckAccountType(AccountType.AGENCY)
  @Post('send-invitation')
  async sendInvitation(
    @Body() createInvitation: CreateInvitationDto,
    @Req() req: Request,
  ) {
    return this.employeeInvitationService.sendInvitation(
      createInvitation,
      req['user'].id,
    );
  }

  @UseGuards(AccessTokenGuard)
  @CheckAccountType(AccountType.AGENCY)
  @Delete('cancel-invitation/:id')
  async cancelInvitation(@Param('id') id: string) {
    return this.employeeInvitationService.cancelInvitation(id);
  }

  @Post('check-invitation/:token')
  async checkInvitation(@Param('token') token: string) {
    return await this.employeeInvitationService.checkInvitation(token);
  }
}
