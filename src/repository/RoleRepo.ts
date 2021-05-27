import { Permission, Role } from '@prisma/client';
import prisma from '../../prisma';

export default {
  getAllRoles: (): Promise<Role[] | null> => {
    return prisma.role.findMany();
  },
  getPermissionsByRoleId: (roleId: string): Promise<Permission[] | null> => {
    return prisma.role
      .findUnique({
        where: { id: roleId },
      })
      .permissions();
  },
};
