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
  ): Promise<BothTokensResponse> {
    const refreshTokenIdentifier = this.generateUUID();
    const accessToken = await this.generateAccessToken(
      id,
      email,
      refreshTokenIdentifier,
    );
    const refreshToken = await this.generateRefreshToken(
      id,
      email,
      refreshTokenIdentifier,
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
    refreshTokenIdentifierArg?: string,
  ): Promise<AccessTokenResponse> => {
    const refreshTokenIdentifier =
      refreshTokenIdentifierArg || this.generateUUID();
    const payload = { id, email, refreshTokenIdentifier };
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
    refreshTokenIdentifierArg?: string,
  ) => {
    const refreshTokenIdentifier =
      refreshTokenIdentifierArg || this.generateUUID();

    const payload = { id, email, refreshTokenIdentifier };
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
