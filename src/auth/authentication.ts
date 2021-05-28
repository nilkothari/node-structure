import { NextFunction, Response } from 'express';
import { ProtectedRequest } from 'app-request';
import { AuthFailureError, AccessTokenError, TokenExpiredError } from '../core/ApiError';
import JWT from '../core/JWT';
import KeystoreRepo from '../repository/KeystoreRepo';
import { getAccessToken, validateTokenData } from './authUtils';

export default async (req: ProtectedRequest, res: Response, next: NextFunction) => {
  req.accessToken = getAccessToken(req.headers.authorization);
  if (req.accessToken) {
    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);
      req.payload = payload;
      const keyStore = await KeystoreRepo.findforKey(payload.uid, payload.prm);
      if (!keyStore) throw new AuthFailureError('Invalid access token');
      req.keystore = keyStore;
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }
  next();
};
