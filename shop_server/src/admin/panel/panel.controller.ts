import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { PanelCreateData } from './dto';
import { PanelService } from './panel.service';
import { GroupService } from '../group/group.service';

@Controller('admin/panel')
export class PanelController {
  constructor(
    private readonly panelService: PanelService,
    private readonly groupService: GroupService,
  ) {}

  @Post('create')
  async createPanel(@Body() data: PanelCreateData) {
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

  @Get('/group/:groupId/products')
  async getPanelGroupProducts(@Param('groupId') groupId: string) {
    return await this.groupService.groupProducts({ groupId: Number(groupId) });
  }
}
