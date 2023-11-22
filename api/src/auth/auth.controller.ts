import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, SignupTouristDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign-up/tourist')
  async createTourist(@Body() signupTouristDto: SignupTouristDto) {
    try {
      const userExists = await this.usersService.findAccountByEmail(
        signupTouristDto.email,
      );

      if (userExists) {
        throw new ConflictException(
          'An account with this email already exists',
        );
      }

      return await this.authService.create(signupTouristDto);
    } catch (err) {}
  }
}
