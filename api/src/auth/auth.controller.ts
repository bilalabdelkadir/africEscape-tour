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
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SigninTouristDto,
  SignupAgencyDto,
  SignupTouristDto,
} from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as DeviceDetector from 'device-detector-js';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Response, Request } from 'express';
import { AgencyService } from 'src/agency/agency.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly agencyService: AgencyService,
  ) {}
  private readonly deviceDetector = new DeviceDetector();

  @Post('sign-up/tourist')
  async createTourist(
    @Body() signupTouristDto: SignupTouristDto,
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    console.log(signupTouristDto);
    try {
      const userExists = await this.usersService.findAccountByEmail(
        signupTouristDto.email,
      );

      if (userExists) {
        throw new ConflictException(
          'An account with this email already exists',
        );
      }

      const result = await this.authService.RegisterTouristAccount(
        signupTouristDto,
        req,
      );

      const { refreshToken, ...userData } = result;

      res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });

      return {
        ...userData,
      };
    } catch (err) {
      Logger.log(err);
      throw new HttpException(err.message, err.status);
    }
  }

  @Post('sign-up/agency')
  async createAgency(
    @Body() signupAgencyDto: SignupAgencyDto,
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    try {
      const userExists = await this.usersService.findAccountByEmail(
        signupAgencyDto.email,
      );

      if (userExists) {
        throw new ConflictException(
          'An account with this email already exists',
        );
      }

      const data = await this.authService.RegisterAgencyAccount(
        signupAgencyDto,
        req,
      );

      const { refreshToken, ...agency } = data;

      res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });

      return agency;
    } catch (err) {
      Logger.log(err);
      throw new HttpException(err.message, err.status);
    }
  }

  @HttpCode(200)
  @Post('sign-in/tourist')
  async signInTourist(
    @Body() signinTouristDto: SigninTouristDto,
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const response = await this.authService.signInTourist(
      signinTouristDto,
      req,
    );
    const { refreshToken, ...user } = response;

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    return user;
  }

  @Get('/tourist/me')
  @UseGuards(AccessTokenGuard)
  async getMe(@Req() req: Request) {
    return this.authService.me(req);
  }

  @Post('sign-out')
  @UseGuards(AccessTokenGuard)
  async signOut(
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    console.log(req['user']);

    res.clearCookie('refresh-token');
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
    res: Response,
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
