import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto, SalesHistoryQuery } from './dto';

@Controller('/admin/sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('/create')
  async createSale(@Body() data: CreateSaleDto) {
    return await this.saleService.create(data);
  }

  @Get('/:panelId/history')
  async getSalesList(
    @Param('panelId', ParseIntPipe) panelId: number,
    @Query() query: SalesHistoryQuery,
  ) {
    return await this.saleService.salesHistory(panelId, query);
  }
}
