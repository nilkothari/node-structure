import { Request } from 'express';
import { User, KeyStore } from '@prisma/client';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User | undefined;
  accessToken: string;
  keystore: KeyStore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
