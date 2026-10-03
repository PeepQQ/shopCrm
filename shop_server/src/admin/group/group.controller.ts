import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GroupService } from './group.service';
import {
  CreateGroupDto,
  ConnectDisconnectProductDto,
  ChangeParentDto,
} from './dto';

@Controller('admin/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async create(@Body() data: CreateGroupDto) {
    return await this.groupService.create(data);
  }

  @Delete(':groupId')
  async delete(@Param('groupId', ParseIntPipe) groupId: number) {
    return await this.groupService.delete({ groupId });
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

  @Get(':groupId/products')
  async getGroupProducts(@Param('groupId') groupId: string) {
    return await this.groupService.groupProducts({ groupId: Number(groupId) });
  }

  @Post('/changeParent')
  async changeParent(@Body() data: ChangeParentDto) {
    return await this.groupService.changeParent(data);
  }
}
