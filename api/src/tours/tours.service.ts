import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { UploadApiResponse } from 'cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import * as slugify from 'slugify';

@Injectable()
export class ToursService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTourDto: CreateTourDto, companyId: string) {
    const agency = await this.prisma.agency.findFirst({
      where: { accountId: companyId },
    });

    const slug = slugify.default(createTourDto.title, { lower: true });

    try {
      const newTour = await this.prisma.tour.create({
        data: {
          ...createTourDto,
          slug: slug,
          Agency: {
            connect: { id: agency.id },
          },
        },
      });

      return newTour;
    } catch (error) {
      Logger.log(error);
      throw new HttpException(error, 500);
    }
  }

  async uploadImages(uploadedImages: UploadApiResponse[], tourId: string) {
    try {
      const newImages = await this.prisma.tourImage.createMany({
        data: uploadedImages.map((image) => ({
          url: image.url,
          alt: image.original_filename,
          id: image.public_id,
          tourId,
        })),
      });

      return newImages;
    } catch (error) {
      Logger.log(error);
      throw new HttpException(error, 500);
    }
  }

  findAll() {
    return `This action returns all tours`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tour`;
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
