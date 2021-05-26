import { Request } from 'express';
import Keystore from '../database/model/Keystore';
import { Prisma, PrismaClient, User } from '@prisma/client';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User | undefined;
  accessToken: string;
  keystore: Keystore;
}

declare interface PrismaRequest extends ProtectedRequest {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
