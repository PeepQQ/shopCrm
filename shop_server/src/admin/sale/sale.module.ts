import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';

@Module({
  imports: [PrismaModule],
  exports: [],
  providers: [SaleService],
  controllers: [SaleController],
})
export class SaleModule {}
