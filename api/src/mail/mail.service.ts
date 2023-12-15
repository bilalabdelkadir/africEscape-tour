import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private node_env = this.configService.get<string>('NODE_ENV');

  async testEmail() {
    await this.mailerService.sendMail({
      to: 'zeemades@gmail.com',
      from: 'africEscape@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome to Africa Escape',
      html: '<b>welcome to Africa Escape</b>',
    });
  }

  async sendInvitation(email: string, token: string, agencyName: string) {
    const baseUrl =
      this.node_env === 'production'
        ? this.configService.get<string>('PRODUCTION_URL')
        : this.configService.get<string>('LOCAL_URL');

    const url = `${baseUrl}/auth/accept-invitation?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: 'africEscape@gmail.com',
      subject: `Invitation to join ${agencyName} on Africa Escape`,
      text: `You have been invited to join ${agencyName} on Africa Escape`,
      html: `
      <div>
        <h1>Hello,</h1>
        <p>You have been invited to join ${agencyName} on Africa Escape</p>
        <p>Click <a href="${url}">here</a> to accept the invitation</p>
      </div>
      `,
    });
  }
}
