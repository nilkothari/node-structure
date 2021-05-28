import UserRepo from '../../repository/UserRepo';
import { SignupInput } from '../interface';

const userMutations = {
  Mutation: {
    checkEmailAvailability: (_parent: any, args: { email: string }) => {
      return UserRepo.checkEmailAvailability(args.email);
    },
    signUp: (_parent: any, args: { signupInput: SignupInput }) => {
      return UserRepo.signUp(args.signupInput);
    },
    login: (_parent: any, args: { email: string; password: string }) => {
      return UserRepo.login(args.email, args.password);
    },
  },
};

export default userMutations;
