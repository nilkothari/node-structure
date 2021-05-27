import { InternalError } from '../core/ApiError';
import KeystoreRepo from './KeystoreRepo';
import { Profile, User } from '@prisma/client';
import prisma from '../database';

export default {
  // contains critical information of the user
  findById: (id: string): Promise<User | null> => {
    return prisma.user.findFirst({
      where: {
        id: id,
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

  findByEmailWithProfile: (email: string): Promise<Profile | null> => {
    return prisma.user
      .findUnique({
        where: {
          email: email,
        },
      })
      .profile();
  },

  // create: async (
  //   user: User,
  //   accessTokenKey: string,
  //   refreshTokenKey: string,
  //   roleCode: string,
  // ): Promise<{ user: User; keystore: Keystore }> => {
  //   const now = new Date();

  //   const role = await RoleModel.findOne({ code: roleCode })
  //     .select('+email +password')
  //     .lean<Role>()
  //     .exec();
  //   if (!role) throw new InternalError('Role must be defined');

  //   user.roles = [role._id];
  //   user.createdAt = user.updatedAt = now;
  //   const createdUser = await UserModel.create(user);
  //   const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);
  //   return { user: createdUser.toObject(), keystore: keystore };
  // },
};
