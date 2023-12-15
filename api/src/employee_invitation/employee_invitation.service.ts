import { ConflictException, Injectable, Logger, Param } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-employee_invitation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingService } from 'src/auth/hashing/hashing.service';
import { MailService } from 'src/mail/mail.service';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EmployeeInvitationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly mailService: MailService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async sendInvitation(
    createInvitation: CreateInvitationDto,
    companyId: string,
  ) {
    const agency = await this.prisma.agency.findFirst({
      where: { accountId: companyId },
    });

    const existingAccount = await this.prisma.account.findFirst({
      where: { email: createInvitation.email },
    });

    if (existingAccount) {
      throw new ConflictException('Email already in use');
    }

    const existingEmployeeInvitation =
      await this.prisma.employeeInvitation.findFirst({
        where: { email: createInvitation.email },
      });

    if (existingEmployeeInvitation) {
      throw new ConflictException('Invitation already sent');
    }

    const generatedToken = Math.floor(100000 + Math.random() * 900000);

    const hashedToken = await this.hashingService.hash(
      generatedToken.toString(),
    );

    const invitation = await this.prisma.employeeInvitation.create({
      data: {
        email: createInvitation.email,
        expiresAt: new Date(new Date().setDate(new Date().getDate() + 3)),
        token: hashedToken,
      },
    });

    this.eventEmitter.emit('invitation.created', {
      email: createInvitation.email,
      token: hashedToken,
      agencyName: agency.agencyName,
    });

    return invitation;
  }

  @OnEvent('invitation.created')
  async sendInvitationEmail(invitationData: {
    email: string;
    token: string;
    agencyName: string;
  }) {
    const { email, token, agencyName } = invitationData;

    Logger.log(
      `Invitation created event received. Email: ${email}, Token: ${token}, Agency Name: ${agencyName}`,
    );

    const sendInvitationEmail = await this.mailService.sendInvitation(
      email,
      token,
      agencyName,
    );
  }

  async cancelInvitation(@Param('id') id: string) {}
}
