import { SuccessResponse } from '../../core/ApiResponse';
import { RoleRequest } from 'app-request';
import crypto from 'crypto';
import UserRepo from '../../database/repository/UserRepo';
import { BadRequestError } from '../../core/ApiError';
import User from '../../database/model/User';
import { createTokens } from '../../auth/authUtils';
import asyncHandler from '../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { RoleCode } from '../../database/model/Role';

export default asyncHandler(async (req: RoleRequest, res) => {
  const user = await UserRepo.findByEmail(req.body.email);
  if (user) throw new BadRequestError('User already registered');

  const accessTokenKey = crypto.randomBytes(64).toString('hex');
  const refreshTokenKey = crypto.randomBytes(64).toString('hex');
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const { user: createdUser, keystore } = await UserRepo.create(
    {
      name: req.body.name,
      email: req.body.email,
      profilePicUrl: req.body.profilePicUrl,
      password: passwordHash,
    } as User,
    accessTokenKey,
    refreshTokenKey,
    RoleCode.USER,
  );

  const tokens = await createTokens(createdUser, keystore.primaryKey, keystore.secondaryKey);
  new SuccessResponse('Signup Successful', {
    user: _.pick(createdUser, ['_id', 'name', 'email', 'roles', 'profilePicUrl']),
    tokens: tokens,
  }).send(res);
});
