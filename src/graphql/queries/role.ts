import prisma from '../../../prisma';
import RoleRepo from '../../repository/RoleRepo';

export default {
  Query: {
    getRoles: () => {
      return RoleRepo.getAllRoles();
    },
  },
  Role: {
    permissions: (parent: { id: any }) => {
      return RoleRepo.getPermissionsByRoleId(parent.id);
    },
  },
};

// const roleQueries = {

// };

// export const roleFields = {};

// export default roleQueries;
