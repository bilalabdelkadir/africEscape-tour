import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { MailModule } from './mail/mail.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AgencyModule } from './agency/agency.module';
import { ToursModule } from './tours/tours.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    MailModule,
    FileUploadModule,
    AgencyModule,
    ToursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

// TODO: handle the logger to log the request and response
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
