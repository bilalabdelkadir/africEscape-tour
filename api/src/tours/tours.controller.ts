import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  HttpException,
  UploadedFiles,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { AccountType } from '@prisma/client';
import { CheckAccountType } from 'src/auth/decorators/AccountTypeChecker';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Controller('tours')
export class ToursController {
  constructor(
    private readonly toursService: ToursService,
    private readonly fileUpload: FileUploadService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @CheckAccountType(AccountType.AGENCY)
  @UseInterceptors(FilesInterceptor('images', 8))
  async create(
    @Body() createTourDto: CreateTourDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() req: Request,
  ) {
    try {
      console.log(createTourDto);
      console.log(images);
      console.log(req['user']);

      const uploadedImages: UploadApiResponse[] = [];

      const createdData = await this.toursService.create(
        createTourDto,
        req['user'].id,
      );

      if (createdData) {
        for (const image of images) {
          const result = await this.fileUpload.uploadImage(image);
          uploadedImages.push(result as UploadApiResponse);
        }
      }

      const uploadedImagesData =
        createdData &&
        this.toursService.uploadImages(uploadedImages, createdData.id);

      return {
        ...createdData,
        images: uploadedImagesData,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
