import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async testEmail() {
    await this.mailerService.sendMail({
      to: 'zeemades@gmail.com',
      from: 'africEscape@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome to Africa Escape',
      html: '<b>welcome to Africa Escape</b>',
    });
  }
}
