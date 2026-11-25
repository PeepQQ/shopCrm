import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto, SalesHistoryDto } from './dto';
import { type Request as Requesttype } from 'express';

@Controller('/admin/sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('/create')
  async createSale(@Request() req: Requesttype, @Body() data: CreateSaleDto) {
    return await this.saleService.create(data, req.user!.id);
  }

  @Get('/:panelId/history')
  async getSalesList(
    @Param('panelId', ParseIntPipe) panelId: number,
    @Query() query: SalesHistoryDto,
  ) {
    return await this.saleService.salesHistory(panelId, query);
  }
}
