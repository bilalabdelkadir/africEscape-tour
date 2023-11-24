import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateAuthDto,
  SigninTouristDto,
  SignupTouristDto,
} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { HashingService } from './hashing/hashing.service';
import { UsersService } from 'src/users/users.service';
import { JwtGeneratorService } from './jwt/jwt.service';
import { Request } from 'express';
import * as DeviceDetector from 'device-detector-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly Prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
    private readonly jwtGeneratorService: JwtGeneratorService,
  ) {}

  private readonly deviceDetector = new DeviceDetector();

  async create(signupTouristDto: SignupTouristDto) {
    try {
      const hashedPassword = await this.hashingService.hash(
        signupTouristDto.password,
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

  async signInTourist(
    signinTouristDto: SigninTouristDto,
    req: Request,
  ): Promise<{ message: string; accessToken: string; refreshToken: string }> {
    try {
      const userExists = await this.usersService.findAccountByEmail(
        signinTouristDto.email,
      );

      if (!userExists) {
        throw new NotFoundException(
          'An account with this email does not exist',
        );
      }
      const passwordMatches = await this.hashingService.compareHash(
        signinTouristDto.password,
        userExists.hashedPassword,
      );

      if (!passwordMatches) {
        throw new UnauthorizedException('Incorrect password');
      }

      const { accessToken, refreshToken, refreshTokenIdentifier } =
        await this.jwtGeneratorService.generateBothTokens(
          userExists.id,
          userExists.email,
        );

      if (accessToken === undefined || refreshToken === undefined) {
        throw new HttpException('Failed to autheticate', 500);
      }

      const hasedRefreshToken = await this.hashingService.hash(refreshToken);

      const userRequestInfo = this.parseUserAgent(req.headers['user-agent']);

      //  expirest after 7 days
      const refreshTokenExpiresAt = new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      );

      await this.usersService.createRefreshToken(
        userExists.id,
        refreshTokenIdentifier,
        hasedRefreshToken,
        refreshTokenExpiresAt,
        userRequestInfo.operatingSystem,
        userRequestInfo.browser,
        userRequestInfo.device,
        userRequestInfo.agent,
      );

      return {
        message: 'Successfully signed in',
        accessToken,
        refreshToken,
      };
    } catch (err) {
      Logger.error(err);
      throw new HttpException(err.message, err.status);
    }
  }

  private parseUserAgent(userAgent: string): {
    operatingSystem: string;
    browser: string;
    device: string;
    agent: string;
  } {
    const operatingSystem = this.deviceDetector.parse(userAgent)?.os?.name
      ? this.deviceDetector.parse(userAgent)?.os?.name
      : 'postman';
    const browser = this.deviceDetector.parse(userAgent)?.client?.name
      ? this.deviceDetector.parse(userAgent)?.client?.name
      : 'postman';
    const device = this.deviceDetector.parse(userAgent)?.device?.type
      ? this.deviceDetector.parse(userAgent)?.device?.type
      : 'postman';

    const agent = userAgent?.length > 0 ? userAgent : 'postman';

    return {
      operatingSystem,
      browser,
      device,
      agent,
    };
  }

  async refreshTokenTest(req: Request) {
    try {
      const userAgent = req.headers['user-agent'];
      const user = req['user'];

      const refreshToken = await this.Prisma.refreshTokens.findFirst({
        where: {
          refreshTokenIdentifier: user.refreshTokenIdentifier,
        },
      });

      // then we compare check if the operation system, browser, device and agent are the same
      if (
        refreshToken.operatingSystem !==
          this.parseUserAgent(userAgent).operatingSystem ||
        refreshToken.browser !== this.parseUserAgent(userAgent).browser ||
        refreshToken.device !== this.parseUserAgent(userAgent).device ||
        refreshToken.agent !== this.parseUserAgent(userAgent).agent
      ) {
        throw new UnauthorizedException('Invalid device');
      }

      if (new Date() > refreshToken.expiresAt) {
        throw new UnauthorizedException('Invalid credentials');
      }

      Logger.log('hased refresh', refreshToken.hashedToken);
      Logger.log('unhshed', user.refreshToken);

      // then we check if the refresh token is valid
      const isValid = await this.hashingService.compareHash(
        user.refreshToken,
        refreshToken.hashedToken,
      );

      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // then we delete the old refresh token
      await this.Prisma.refreshTokens.delete({
        where: {
          id: refreshToken.id,
        },
      });

      // then we generate a new access token and refresh token
      const {
        accessToken,
        refreshToken: newRefreshToken,
        refreshTokenIdentifier,
      } = await this.jwtGeneratorService.generateBothTokens(
        user.id,
        user.email,
      );

      // then we hash the new refresh token
      const hashedRefreshToken =
        await this.hashingService.hash(newRefreshToken);

      // then we save the new refresh token
      await this.usersService.createRefreshToken(
        user.id,
        refreshTokenIdentifier,
        hashedRefreshToken,
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        this.parseUserAgent(userAgent).operatingSystem,
        this.parseUserAgent(userAgent).browser,
        this.parseUserAgent(userAgent).device,
        this.parseUserAgent(userAgent).agent,
      );

      // then we send the new access token and refresh token
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
