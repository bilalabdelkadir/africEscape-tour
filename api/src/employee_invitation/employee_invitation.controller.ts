import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmployeeInvitationService } from './employee_invitation.service';
import {
  CreateEmployeeInvitationDto,
  CreateInvitationDto,
} from './dto/create-employee_invitation.dto';
import { UpdateEmployeeInvitationDto } from './dto/update-employee_invitation.dto';
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

  // @Post('accept-invitation/:token')
  // async acceptInvitation(
  //   @Param('token') token: string,
  //   @Body() updateEmployeeInvitationDto: UpdateEmployeeInvitationDto,
  // ) {
  //   return this.employeeInvitationService.acceptInvitation(
  //     token,
  //     updateEmployeeInvitationDto,
  //   );
  // }
}
