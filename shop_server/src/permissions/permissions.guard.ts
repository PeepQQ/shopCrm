import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminService } from '../admin/admin.service';
import { rolePermissions } from './permissions';
import { Request } from 'express';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) return false;

    return requiredPermissions.every((permission) =>
      rolePermissions[user.role]?.includes(permission),
    );
  }
}
