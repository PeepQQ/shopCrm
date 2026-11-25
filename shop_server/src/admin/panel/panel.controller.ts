import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreatePanelSupplyDto,
  GetPanelSaleStatisticsDto,
  PanelCreateDto,
} from './dto';
import { PanelService } from './panel.service';

@Controller('admin/panel')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Post('create')
  async createPanel(@Body() data: PanelCreateDto) {
    return await this.panelService.create(data);
  }

  @Get('list')
  async getPanelsList() {
    return await this.panelService.list();
  }

  @Get(':panelId/panelProducts')
  async getPanelProducts(@Param('panelId') panelId: string) {
    return await this.panelService.panelProducts({ panelId: Number(panelId) });
  }

  @Post(':panelId/createSupply')
  async createPanelSupply(
    @Param('panelId') panelId: string,
    @Body() data: CreatePanelSupplyDto[],
  ) {
    return await this.panelService.createSupply(data, Number(panelId));
  }

  @Get(':panelId/statistics/sale')
  async getPanelSaleStatistics(
    @Param('panelId', ParseIntPipe) panelId: number,
    @Query() query: GetPanelSaleStatisticsDto,
  ) {
    return await this.panelService.panelSaleStatistics(panelId, query);
  }
}
