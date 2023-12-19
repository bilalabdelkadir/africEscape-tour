import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from '../dto/createTag.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    console.log(createTagDto);
    return this.tagsService.createTag(createTagDto.name);
    // return tagName;
  }

  @Get()
  findAllTags() {
    return this.tagsService.getTags();
  }
}
