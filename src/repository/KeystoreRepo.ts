import { User, KeyStore } from '@prisma/client';
import prisma from '../database';

export default {
  findforKey: (client: User, key: string): Promise<KeyStore | null> => {
    return prisma.keyStore.findFirst({
      where: {
        userId: client.id,
        primaryKey: key,
      },
    });
  },
  remove: (id: number): Promise<KeyStore | null> => {
    return prisma.keyStore.delete({
      where: {
        id: id,
      },
    });
  },
  find: (userId: string, primaryKey: string, secondaryKey: string): Promise<KeyStore | null> => {
    return prisma.keyStore.findFirst({
      where: {
        userId: userId,
        primaryKey: primaryKey,
        secondaryKey: secondaryKey,
      },
    });
  },
  create: async (userId: string, primaryKey: string, secondaryKey: string): Promise<KeyStore> => {
    const keystore = await prisma.keyStore.create({
      data: {
        primaryKey: primaryKey,
        secondaryKey: secondaryKey,
        user: {
          connect: { id: userId },
        },
      },
    });
    return keystore;
  },
};
