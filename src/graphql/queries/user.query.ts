const userQueries = {
  getRoles: async (parent: any, args: any, context: any, info: any) => {
    return context.prisma.role.findMany();
  },
};

export default userQueries;
