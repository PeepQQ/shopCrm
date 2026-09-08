import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [GroupService],
  providers: [GroupService, PrismaService],
  controllers: [GroupController],
})
export class GroupModule {}
