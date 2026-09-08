import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwtAuth.guard';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('admin')
export class AdminController {
  constructor() {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('edit')
  @Get('testAdmin')
  async testAdmin() {
    return 'true';
  }

  @Get('testSuperAdmin')
  async testSuperAdmin() {}
}
