import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { TagsService } from './tags/tags.service';

@Module({
  imports: [FileUploadModule],
  controllers: [ToursController],
  providers: [ToursService, TagsService],
})
export class ToursModule {}
