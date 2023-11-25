import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingService } from './hashing/hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtGeneratorService } from './jwt/jwt.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AgencyModule } from 'src/agency/agency.module';

@Module({
  imports: [UsersModule, AgencyModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashingService,
    JwtGeneratorService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
