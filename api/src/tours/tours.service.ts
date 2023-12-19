import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { UploadApiResponse } from 'cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import * as slugify from 'slugify';
import { TagsService } from './tags/tags.service';

@Injectable()
export class ToursService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagsService: TagsService,
  ) {}

  async create(createTourDto: CreateTourDto, companyId: string) {
    const agency = await this.prisma.agency.findFirst({
      where: { accountId: companyId },
    });

    const slug = slugify.default(createTourDto.title, { lower: true });

    // const existingTags = await this.tagsService.getTagsByName(
    //   createTourDto.tags,
    // );

    // const newTags = createTourDto.tags.filter(
    //   (tag) => !existingTags.find((existingTag) => existingTag.name === tag),
    // );

    // const createdTags = newTags.length
    //   ? await newTags.map((tag) => this.tagsService.createTag(tag))
    //   : [];

    // const tags = [...existingTags, ...createdTags];

    try {
      const newTour = await this.prisma.tour.create({
        data: {
          ...CreateTourDto,
          content: createTourDto.content,
          slug,
          price: createTourDto.price,
          startDate: createTourDto.startDate,
          endDate: createTourDto.endDate,
          title: createTourDto.title,
          agencyId: agency.id,
          duration: createTourDto.duration,
          postStatus: createTourDto.postStatus,
          leadGuideId: createTourDto.leadGuideId,
          guides: {
            // if the tourguide is a string we only connect the id if it is an array we loop through the array and connect the ids
            connect: Array.isArray(createTourDto.guideIds)
              ? createTourDto.guideIds.map((guide) => ({ id: guide }))
              : [{ id: createTourDto.guideIds }],
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

  async findAll() {
    return await this.prisma.tour.findMany({
      include: {
        TourImages: true,
        Agency: true,
        Tags: true,
        guides: true,
        leadGuide: true,
        tourists: true,
      },
    });
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
