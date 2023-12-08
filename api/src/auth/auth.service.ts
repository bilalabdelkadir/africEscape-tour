import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  SigninTouristDto,
  SignupAgencyDto,
  SignupTouristDto,
} from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingService } from './hashing/hashing.service';
import { UsersService } from 'src/users/users.service';
import { JwtGeneratorService } from './jwt/jwt.service';
import { Request } from 'express';
import * as DeviceDetector from 'device-detector-js';
import { AgencyService } from 'src/agency/agency.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly Prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
    private readonly jwtGeneratorService: JwtGeneratorService,
    private readonly agencyService: AgencyService,
  ) {}

  private readonly deviceDetector = new DeviceDetector();

  async RegisterTouristAccount(
    signupTouristDto: SignupTouristDto,
    req: Request,
  ) {
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

      // generate access token and refresh token
      const { accessToken, refreshToken, refreshTokenIdentifier } =
        await this.jwtGeneratorService.generateBothTokens(
          newUser.id,
          newUser.email,
          newUser.accountType,
        );

      if (accessToken === undefined || refreshToken === undefined) {
        throw new HttpException('Failed to autheticate', 500);
      }

      const hasedRefreshToken = await this.hashingService.hash(refreshToken);

      const userRequestInfo = this.parseUserAgent(req.headers['user-agent']);

      const refreshTokenExpiresAt = new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
      );

      await this.usersService.createRefreshToken(
        newUser.id,
        refreshTokenIdentifier,
        hasedRefreshToken,
        refreshTokenExpiresAt,
        userRequestInfo.operatingSystem,
        userRequestInfo.browser,
        userRequestInfo.device,
        userRequestInfo.agent,
      );

      const user = {
        id: newUser.id,
        firstName: newUser.Tourist[0].firstName,
        lastName: newUser.Tourist[0].lastName,
        email: newUser.email,
        accountType: newUser.accountType,
        isEmailVerified: newUser.isEmailVerified,
        avatar: newUser.Tourist[0].avatar,
        createdAt: newUser.createdAt,
      };

      return {
        message: 'Successfully signed up',
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      throw err;
    }
  }

  async RegisterAgencyAccount(signupAgencyDto: SignupAgencyDto) {
    try {
      const hashedPassword = await this.hashingService.hash(
        signupAgencyDto.password,
      );
      const newAgency = await this.agencyService.create({
        email: signupAgencyDto.email,
        password: hashedPassword,
        agencyName: signupAgencyDto.agencyName,
        phoneNumber: signupAgencyDto.phoneNumber,
        address: signupAgencyDto.address,
        city: signupAgencyDto.city,
        country: signupAgencyDto.country,
      });

      return newAgency;
    } catch (err) {
      throw err;
    }
  }

  async signInTourist(
    signinTouristDto: SigninTouristDto,
    req: Request,
  ): Promise<{
    message: string;
    accessToken: string;
    refreshToken: string;
    user: any;
  }> {
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
          userExists.accountType,
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

      const user = {
        id: userExists.id,
        firstName: userExists.Tourist[0].firstName,
        lastName: userExists.Tourist[0].lastName,
        email: userExists.email,
        accountType: userExists.accountType,
        isEmailVerified: userExists.isEmailVerified,
        avatar: userExists.Tourist[0].avatar,
        createdAt: userExists.createdAt,
      };

      return {
        message: 'Successfully signed in',
        accessToken,
        refreshToken,
        user: user,
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
        user.accountType,
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

  async signout(req: Request) {
    const refreshTokenIdentifier = req['user'].refreshTokenIdentifier;

    await this.Prisma.refreshTokens.deleteMany({
      where: {
        refreshTokenIdentifier,
      },
    });

    return {
      message: 'Signed out successfully',
    };
  }

  async me(req: Request) {
    try {
      let reqUser = req['user'];

      const userExists = await this.usersService.findAccountByEmail(
        reqUser.email,
      );

      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      const user = {
        id: userExists.id,
        firstName: userExists.Tourist[0].firstName,
        lastName: userExists.Tourist[0].lastName,
        email: userExists.email,
        accountType: userExists.accountType,
        isEmailVerified: userExists.isEmailVerified,
        avatar: userExists.Tourist[0].avatar,
        createdAt: userExists.createdAt,
      };

      return {
        message: 'User found',
        user: user,
      };
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
}
