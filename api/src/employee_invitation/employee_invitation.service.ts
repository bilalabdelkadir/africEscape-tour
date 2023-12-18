import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';
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

    const generatedToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const invitation = await this.prisma.employeeInvitation.create({
      data: {
        email: createInvitation.email,
        expiresAt: new Date(new Date().setDate(new Date().getDate() + 3)),
        token: generatedToken,
        agencyId: agency.id,
      },
    });

    this.eventEmitter.emit('invitation.created', {
      email: createInvitation.email,
      token: generatedToken,
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

    await this.mailService.sendInvitation(email, token, agencyName);
  }

  async checkInvitation(token: string) {
    try {
      const invitation = await this.prisma.employeeInvitation.findFirst({
        where: { token },
      });

      if (!invitation) {
        return false;
      }

      if (invitation.expiresAt < new Date()) {
        return false;
      }

      return {
        email: invitation.email,
        true: true,
        agencyId: invitation.agencyId,
      };
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  async cancelInvitation(@Param('id') id: string) {
    const invitation = await this.prisma.employeeInvitation.findUnique({
      where: { id },
    });

    if (!invitation) {
      throw new ConflictException('Invitation not found');
    }

    const deletedInvitation = await this.prisma.employeeInvitation.delete({
      where: { id },
    });

    return deletedInvitation;
  }
}
