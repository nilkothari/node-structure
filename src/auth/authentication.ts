import { NextFunction, Response } from 'express';
import UserRepo from '../repository/UserRepo';
import { ProtectedRequest } from 'app-request';
import { AuthFailureError, AccessTokenError, TokenExpiredError } from '../core/ApiError';
import JWT from '../core/JWT';
import KeystoreRepo from '../repository/KeystoreRepo';
import { getAccessToken, validateTokenData } from './authUtils';
import validator, { ValidationSource } from '../helpers/validator';
import schema from './schema';
import asyncHandler from '../helpers/asyncHandler';
import prisma from '../database';

export default async (req: ProtectedRequest, res: Response, next: NextFunction) => {
  req.accessToken = getAccessToken(req.headers.authorization);
  if (req.accessToken) {
    try {
      const payload = await JWT.validate(req.accessToken);
      validateTokenData(payload);
      const user = await prisma.user.findFirst({
        where: {
          id: payload.sub,
        },
        include: {
          profile: {
            include: {
              role: true,
            },
          },
        },
      });
      req.user = user || undefined;
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }
  next();
};

// export default router.use(
//   validator(schema.auth, ValidationSource.HEADER),
//   asyncHandler(async (req: ProtectedRequest, res, next) => {
//     req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

//     try {
//       const payload = await JWT.validate(req.accessToken);
//       validateTokenData(payload);

//       const user = await UserRepo.findById(new Types.ObjectId(payload.sub));
//       if (!user) throw new AuthFailureError('User not registered');
//       req.user = user;

//       const keystore = await KeystoreRepo.findforKey(req.user._id, payload.prm);
//       if (!keystore) throw new AuthFailureError('Invalid access token');
//       req.keystore = keystore;

//       return next();
//     } catch (e) {
//       if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
//       throw e;
//     }
//   }),
// );
