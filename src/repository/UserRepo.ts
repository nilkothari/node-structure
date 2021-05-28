import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Profile, Role, User } from '@prisma/client';
import { AuthFailureError, BadRequestError, InternalError } from '../core/ApiError';
import KeystoreRepo from './KeystoreRepo';
import prisma from '../database';
import { AuthResponse, SignupInput } from '../graphql/interface';
import { createTokens } from '../auth/authUtils';

const UserRepo = {
  findAll: (): Promise<User[] | null> => {
    return prisma.user.findMany({
      where: {
        isDeleted: false,
        isActive: true,
      },
    });
  },

  findById: (id: string): Promise<User | null> => {
    return prisma.user.findFirst({
      where: {
        id: id,
        isDeleted: false,
        isActive: true,
      },
    });
  },

  findByIdWithProfile: (id: string): Promise<Profile | null> => {
    return prisma.user
      .findUnique({
        where: {
          id: id,
        },
      })
      .profile();
  },

  findByEmail: (email: string): Promise<User | null> => {
    return prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  },

  findRoleForProfile: (id: string): Promise<Role | null> => {
    return prisma.profile
      .findUnique({
        where: {
          id: id,
        },
      })
      .role();
  },

  checkEmailAvailability: async (email: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        isActive: true,
        isDeleted: false,
      },
    });
    if (user) {
      return false;
    }
    return true;
  },

  signUp: async (signupInput: SignupInput): Promise<User> => {
    if (UserRepo.checkEmailAvailability(signupInput.email)) {
      const accessTokenKey = crypto.randomBytes(64).toString('hex');
      const refreshTokenKey = crypto.randomBytes(64).toString('hex');
      const passwordHash = await bcrypt.hash(signupInput.password, 10);

      const user = await prisma.user.create({
        data: {
          email: signupInput.email,
          password: passwordHash,
          name: signupInput.name,
          profile: {
            create: {
              role: {
                connect: {
                  id: signupInput.roleId,
                },
              },
            },
          },
        },
      });
      return user;
    }
    throw new BadRequestError('User already registered');
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const user = await UserRepo.findByEmail(email);
    if (!user) {
      throw new BadRequestError('User not registered');
    }
    if (!user.password) {
      throw new BadRequestError('Password not set');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AuthFailureError('Authentication failure');
    }
    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    await KeystoreRepo.create(user.id, accessTokenKey, refreshTokenKey);
    const token = await createTokens(user, accessTokenKey, refreshTokenKey);
    const response: AuthResponse = {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      userId: user.id,
    };
    return response;
  },
};

export default UserRepo;
