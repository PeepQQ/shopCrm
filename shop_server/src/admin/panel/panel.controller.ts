import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PanelCreateDto } from './dto';
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
}
