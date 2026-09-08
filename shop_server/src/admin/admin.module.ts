import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PanelModule } from './panel/panel.module';
import { GroupModule } from './group/group.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [PrismaModule, PanelModule, GroupModule, ProductModule, SaleModule],
  exports: [AdminService],
  providers: [PrismaService, AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
