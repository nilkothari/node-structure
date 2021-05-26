import { PrismaRequest } from 'app-request';

export default {
  Query: {
    getRoles: async (parent: any, args: any, context: any, info: any) => {
      return context.req.prisma.role.findMany();
    },
  },
  Role: {
    permissions: (parent: { id: any }, _args: any, context: any) => {
      return context.req.prisma.role
        .findUnique({
          where: { id: parent?.id },
        })
        .permissions();
    },
  },
};

// const roleQueries = {

// };

// export const roleFields = {};

// export default roleQueries;
