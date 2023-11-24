import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  Req,
  Logger,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninTouristDto, SignupTouristDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as DeviceDetector from 'device-detector-js';
import { Request, response } from 'express';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

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
    @Res({
      passthrough: true,
    })
    res = response,
  ) {
    const response = await this.authService.signInTourist(
      signinTouristDto,
      req,
    );
    res.cookie('refresh-token', response.refreshToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.cookie('access-token', response.accessToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    return response;
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  getMe(@Req() req: Request) {
    console.log(req['user']);
    return 'Hello';
  }

  @Post('sign-out')
  @UseGuards(AccessTokenGuard)
  async signOut(
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res = response,
  ) {
    console.log(req['user']);

    res.clearCookie('refresh-token');
    res.clearCookie('access-token');
    const response = await this.authService.signout(req);
    return response;
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res = response,
  ) {
    const response = await this.authService.refreshTokenTest(req);
    res.cookie('refresh-token', response.refreshToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.cookie('access-token', response.accessToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 15),
    });

    return response;
  }

  @Post('user-agent-test')
  async userAgentTest(@Req() req: Request) {
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
