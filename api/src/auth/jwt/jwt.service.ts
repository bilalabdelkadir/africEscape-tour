import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

interface AccessTokenResponse {
  accessToken: string;
  refreshTokenIdentifier: string;
}

interface RefreshTokenResponse {
  refreshToken: string;
  refreshTokenIdentifier: string;
}

interface BothTokensResponse {
  accessToken: string;
  refreshToken: string;
  refreshTokenIdentifier: string;
}

@Injectable()
export class JwtGeneratorService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateUUID() {
    return randomUUID();
  }

  async generateBothTokens(
    id: string,
    email: string,
    accountType: string,
  ): Promise<BothTokensResponse> {
    const refreshTokenIdentifier = this.generateUUID();
    console.log('generateBothTokens', refreshTokenIdentifier);
    const accessToken = await this.generateAccessToken(
      id,
      email,
      refreshTokenIdentifier,
      accountType,
    );
    const refreshToken = await this.generateRefreshToken(
      id,
      email,
      refreshTokenIdentifier,
      accountType,
    );

    return {
      accessToken: accessToken.accessToken,
      refreshToken: refreshToken.refreshToken,
      refreshTokenIdentifier: refreshTokenIdentifier,
    };
  }

  generateAccessToken = async (
    id: string,
    email: string,
    refreshTokenIdentifierArg: string,
    accountType: string,
  ): Promise<AccessTokenResponse> => {
    const refreshTokenIdentifier =
      refreshTokenIdentifierArg || this.generateUUID();
    const payload = { id, email, refreshTokenIdentifier, accountType };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('ACCESS_TOKEN_TTL')}`,
    });

    return {
      accessToken,
      refreshTokenIdentifier,
    };
  };

  generateRefreshToken = async (
    id: string,
    email: string,
    refreshTokenIdentifierArg: string,
    accountType: string,
  ) => {
    const refreshTokenIdentifier =
      refreshTokenIdentifierArg || this.generateUUID();

    const payload = { id, email, refreshTokenIdentifier, accountType };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('REFRESH_TOEKN_TTL')}`,
    });

    return {
      refreshToken,
      refreshTokenIdentifier,
    };
  };
}
