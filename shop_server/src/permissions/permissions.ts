import { UserRole } from 'src/generated/prisma/enums';

export const permission = {
  admin: {
    panel: {
      create: 'create'
    }
  }
}

export const userPermissions = [''];
export const adminPermissions = [''];
export const superAdminPermissions = [permission.admin.panel.create];

export const rolePermissions = {
  [UserRole.USER]: userPermissions,
  [UserRole.ADMIN]: [...userPermissions, ...adminPermissions],
  [UserRole.SUPER_ADMIN]: [
    ...userPermissions,
    ...adminPermissions,
    ...superAdminPermissions,
  ],
};
