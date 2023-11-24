import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserOutputDto } from './dtos/create-user.output.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAccountByEmail(email: string): Promise<Account> {
    return this.prisma.account.findUnique({
      where: {
        email,
      },
      include: {
        refreshTokens: true,
        Tourist: true,
      },
    });
  }

  async findAccountById(id: string): Promise<Account> {
    return this.prisma.account.findUnique({
      where: {
        id,
      },
      include: {
        refreshTokens: true,
        Tourist: true,
      },
    });
  }

  async createAccount(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    return await this.prisma.account.create({
      data: {
        email,
        hashedPassword: password,
        Tourist: {
          create: {
            firstName,
            lastName,
            email,
          },
        },
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        Tourist: true,
      },
    });
  }

  async createRefreshToken(
    id: string,
    refreshTokenIdentifier: string,
    hasedRefreshToken: string,
    expiresAt: Date,
    operatingSystem?: string,
    browser?: string,
    device?: string,
    agent?: string,
  ) {
    return await this.prisma.refreshTokens.create({
      data: {
        expiresAt,
        refreshTokenIdentifier,
        hashedToken: hasedRefreshToken,
        agent,
        operatingSystem,
        browser,
        device,
        Account: {
          connect: {
            id,
          },
        },
      },
    });
  }
}
