import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { ProductModule } from '../product/product.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [ProductModule, GroupModule],
  providers: [PrismaService, PanelService],
  exports: [],
  controllers: [PanelController],
})
export class PanelModule {}
