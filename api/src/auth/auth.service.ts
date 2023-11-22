import { Injectable } from '@nestjs/common';
import { CreateAuthDto, SignupTouristDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { HashingService } from './hashing/hashing.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly Prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
  ) {}

  async create(signupTouristDto: SignupTouristDto) {
    try {
      const hashedPassword = await this.hashingService.hash(
        signupTouristDto.email,
      );
      const newUser = await this.usersService.createAccount(
        signupTouristDto.email,
        hashedPassword,
        signupTouristDto.firstName,
        signupTouristDto.lastName,
      );

      return newUser;
    } catch (err) {
      throw err;
    }
  }
}
