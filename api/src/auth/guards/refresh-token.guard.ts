import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { REQUEST_USER_KEY } from '../constants/user.constant';

export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const refreshToken = this.extractRefreshTokenFromRequest(req);
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });
      req[REQUEST_USER_KEY] = payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }

  private extractRefreshTokenFromRequest(req: Request) {
    const refreshToken = req.cookies['refresh-token'];
    return refreshToken;
  }
}
