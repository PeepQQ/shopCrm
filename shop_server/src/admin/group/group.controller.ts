import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto, ConnectDisconnectProductDto } from './dto';

@Controller('admin/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async create(@Body() data: CreateGroupDto) {
    return await this.groupService.create(data);
  }

  @Get(':panelId')
  async list(@Param('panelId', ParseIntPipe) panelId: number) {
    return await this.groupService.list({ panelId });
  }

  @Post(':groupId/connectProduct/:productId')
  async connectProduct(@Param() data: ConnectDisconnectProductDto) {
    return await this.groupService.connectProduct(data);
  }

  @Post(':groupId/disconnectProduct/:productId')
  async disconnectProduct(@Param() data: ConnectDisconnectProductDto) {
    return await this.groupService.disconnectProduct(data);
  }
}
