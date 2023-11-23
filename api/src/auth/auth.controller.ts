import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  Req,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  SigninTouristDto,
  SignupTouristDto,
} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as DeviceDetector from 'device-detector-js';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  private readonly deviceDetector = new DeviceDetector();

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

  @Post('sign-in/tourist')
  async signInTourist(
    @Body() signinTouristDto: SigninTouristDto,
    @Req() req: Request,
  ) {
    return await this.authService.signInTourist(signinTouristDto, req);
  }

  @Post('user-agent-test')
  async userAgentTest(@Req() req) {
    try {
      const userAgent = req.headers['user-agent'];

      const device = this.deviceDetector.parse(userAgent);
      Logger.log(device);

      return {
        userAgent,
        device,
      };
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
