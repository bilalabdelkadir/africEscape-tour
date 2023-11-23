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

  async signInTourist(signinTouristDto: SigninTouristDto, req: Request) {
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

      const hasedRefreshToken = await this.hashingService.hash(refreshToken);

      const userRequestInfo = this.parseUserAgent(req.headers['user-agent']);

      //  expirest after 7 days
      const refreshTokenExpiresAt = new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      );

      const newRefreshToken = await this.usersService.createRefreshToken(
        userExists.id,
        refreshTokenIdentifier,
        hasedRefreshToken,
        refreshTokenExpiresAt,
        userRequestInfo.operatingSystem,
        userRequestInfo.browser,
        userRequestInfo.device,
        userRequestInfo.brand,
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

  // user agent parser
  private parseUserAgent(userAgent: string): {
    operatingSystem: string;
    browser: string;
    device: string;
    brand: string;
    agent: string;
  } {
    const operatingSystem = this.deviceDetector.parse(userAgent).os.name;
    const browser = this.deviceDetector.parse(userAgent).client.name;
    const device = this.deviceDetector.parse(userAgent).device.type;
    const brand = this.deviceDetector.parse(userAgent).device.brand;

    const agent = userAgent;

    return {
      operatingSystem,
      browser,
      device,
      brand,
      agent,
    };
  }
}
