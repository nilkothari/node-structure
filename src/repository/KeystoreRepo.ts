import { User, KeyStore } from '@prisma/client';
import prisma from '../../prisma';

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
  find: (client: User, primaryKey: string, secondaryKey: string): Promise<KeyStore | null> => {
    return prisma.keyStore.findFirst({
      where: {
        userId: client.id,
        primaryKey: primaryKey,
        secondaryKey: secondaryKey,
      },
    });
  },
  create: async (client: User, primaryKey: string, secondaryKey: string): Promise<KeyStore> => {
    const keystore = await prisma.keyStore.create({
      data: {
        primaryKey: primaryKey,
        secondaryKey: secondaryKey,
        user: {
          connect: { id: client.id },
        },
      },
    });
    return keystore;
  },
};
