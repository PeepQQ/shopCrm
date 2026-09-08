import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
    }),
    PrismaModule,
    UserModule,
    AdminModule,
  ],
  exports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
