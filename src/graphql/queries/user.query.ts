import UserRepo from '../../repository/UserRepo';

export default {
  Query: {
    getUsers: () => {
      return UserRepo.findAll();
    },
    getUserByEmail: (_parent: any, args: any) => {
      return UserRepo.findById(args.id);
    },
    getUserById: (_parent: any, args: { id: string }) => {
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
