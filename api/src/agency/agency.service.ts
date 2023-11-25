import { Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgencyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAgencyDto: CreateAgencyDto) {
    return await this.prisma.account.create({
      data: {
        email: createAgencyDto.email,
        hashedPassword: createAgencyDto.password,
        Agency: {
          create: {
            agencyName: createAgencyDto.agencyName,
            email: createAgencyDto.email,
            phoneNumber: createAgencyDto.phoneNumber,
            address: createAgencyDto.address,
            city: createAgencyDto.city,
            country: createAgencyDto.country,
          },
        },
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        Agency: true,
      },
    });
  }
}
