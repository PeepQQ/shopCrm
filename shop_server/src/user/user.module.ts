import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  providers: [PrismaService, UserService],
})
export class UserModule {}
