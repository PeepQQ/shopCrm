import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  exports: [UserService],
  controllers: [UserController],
  providers: [PrismaService, UserService, JwtService],
})
export class UserModule {}
