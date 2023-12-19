import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { TagsService } from './tags/tags.service';
import { TagsController } from './tags/tags.controller';

@Module({
  imports: [FileUploadModule],
  controllers: [ToursController, TagsController],
  providers: [ToursService, TagsService],
})
export class ToursModule {}
