import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Agency')
@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Get('employees/:id')
  async findEmployees(@Param('id') agencyId: string) {
    return await this.agencyService.findEmployees(agencyId);
  }
}
