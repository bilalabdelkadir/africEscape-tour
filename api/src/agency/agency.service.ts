import { Injectable } from '@nestjs/common';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupEmployeeDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class AgencyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAgencyDto: CreateAgencyDto) {
    return await this.prisma.account.create({
      data: {
        email: createAgencyDto.email,
        hashedPassword: createAgencyDto.password,
        accountType: 'AGENCY',
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
        accountType: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
        Agency: true,
      },
    });
  }

  async createEmployee(createEmployeeDto: SignupEmployeeDto) {
    const newEmploye = await this.prisma.account.create({
      data: {
        email: createEmployeeDto.email,
        accountType: 'AGENCY_EMPLOYEE',
        hashedPassword: createEmployeeDto.password,
        isEmailVerified: true,
        AgencyEmployee: {
          create: {
            firstName: createEmployeeDto.firstName,
            lastName: createEmployeeDto.lastName,
            email: createEmployeeDto.email,
            phoneNumber: createEmployeeDto.phoneNumber,
            agencyId: createEmployeeDto.agencyId,
            country: createEmployeeDto.country,
            city: createEmployeeDto.city,
            address: createEmployeeDto.address,
            role: createEmployeeDto.role,
            stateRegion: createEmployeeDto.stateRegion,
          },
        },
      },
      select: {
        id: true,
        email: true,
        accountType: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
        AgencyEmployee: true,
      },
    });

    return newEmploye;
  }
}
