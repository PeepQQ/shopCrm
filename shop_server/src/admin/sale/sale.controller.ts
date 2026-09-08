import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto';

@Controller('/admin/sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('/create')
  async createSale(@Body() data: CreateSaleDto) {
    return await this.saleService.create(data);
  }

  @Get('/list/:panelId')
  async getSalesList(@Param('panelId') panelId: number) {
    return await this.saleService.salesList({ panelId });
  }
}
