import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAccountByEmail(email: string) {
    return this.prisma.account.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        hashedPassword: true,
        updatedAt: true,
        accountType: true,
        isEmailVerified: true,
        Tourist: {
          include: {
            Wishlist: true,
          },
        },
        Agency: true,
      },
    });
  }

  async findAccountById(id: string) {
    return this.prisma.account.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        accountType: true,
        isEmailVerified: true,
        Tourist: true,
        Agency: true,
        refreshTokens: true,
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
        accountType: true,
        isEmailVerified: true,
        refreshTokens: true,
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
