import { Request } from 'express';
import { KeyStore } from '@prisma/client';
import { JwtPayload } from '../core/JWT';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  payload: JwtPayload;
  accessToken: string;
  keystore: KeyStore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
