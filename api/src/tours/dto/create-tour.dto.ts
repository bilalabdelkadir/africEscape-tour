import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TourPublishStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTourDto {
  @ApiProperty({
    example: 'Tour title',
    description: 'The title of the tour',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Tour description',
    description: 'The description of the tour',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'Tour duration',
    description: 'The duration of the tour',
  })
  @IsString()
  duration: string;

  @ApiProperty({
    example: new Date(),
    description: 'The location of the tour',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The location of the tour',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date;

  @ApiProperty({
    example: TourPublishStatus.DRAFT,
    description: 'The location of the tour',
  })
  @IsEnum(TourPublishStatus)
  postStatus: TourPublishStatus;

  @ApiProperty({
    example: '300',
    description: 'The location of the tour',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @Transform(({ value }) => Boolean(value))
  @ApiProperty({
    example: true,
    description: 'The location of the tour',
  })
  @IsBoolean()
  audioGuide: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // foodAndDrinks: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // lunch: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // privateTour: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // specialActivities: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // entranceFees: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // gratuities: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // pickUpAndDropOff: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // professionalGuide: boolean;

  // @ApiProperty({
  //   example: true,
  //   description: 'The location of the tour',
  // })
  // @IsBoolean()
  // transportByAirConditioned: boolean;

  // @IsArray()
  // images: Express.Multer.File[];
}
