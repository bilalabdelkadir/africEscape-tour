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

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const accessToken = this.extractAccessTokenFromRequest(req);
    if (!accessToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });
      req[REQUEST_USER_KEY] = payload;
      console.log('payload', payload);
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }

  private extractAccessTokenFromRequest(req: Request) {
    const accessToken = req.cookies['access-token'];
    return accessToken;
  }

  // async validateAccessToken(accessToken: string) {
  //   try {
  //     const decoded = this.jwtService.verify(accessToken, {
  //       secret: this.configService.get('ACCESS_TOKEN_SECRET'),
  //     });
  //     return decoded;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
