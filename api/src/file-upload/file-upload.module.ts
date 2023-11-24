import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileuploadProvider } from './file-upload';

@Module({
  providers: [FileUploadService, FileuploadProvider],
  exports: [FileUploadService, FileuploadProvider],
})
export class FileUploadModule {}
