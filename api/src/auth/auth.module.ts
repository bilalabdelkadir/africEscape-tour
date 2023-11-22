import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingService } from './hashing/hashing.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, HashingService],
})
export class AuthModule {}
