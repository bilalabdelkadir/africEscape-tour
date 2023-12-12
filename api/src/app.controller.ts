import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload/file-upload.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
    private readonly fileuploadService: FileUploadService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-email')
  async sendMail() {
    await this.mailService.testEmail();
    return 'Email has been sent';
  }

  @Post('upload-pic')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return 'hey';
    // const uploadedFile = await this.fileuploadService.uploadImage(file);

    // return {
    //   url: uploadedFile.url,
    //   type: 'IMAGE',
    //   publicId: uploadedFile.public_id,
    //   format: uploadedFile.format,
    // };
  }
}
