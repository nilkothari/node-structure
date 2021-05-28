import UserRepo from '../../repository/UserRepo';

const userQueries = {
  Query: {
    getUsers: async () => {
      return UserRepo.findAll();
    },
    getUserByEmail: async (_parent: any, args: any) => {
      return UserRepo.findById(args.id);
    },
    getUserById: async (_parent: any, args: { id: string }) => {
      return UserRepo.findById(args.id);
    },
  },
  User: {
    profile: (parent: { id: any }) => {
      return UserRepo.findByIdWithProfile(parent.id);
    },
  },
  Profile: {
    role: (parent: { id: any }) => {
      return UserRepo.findRoleForProfile(parent.id);
    },
  },
};

export default userQueries;
