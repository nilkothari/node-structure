import { SuccessResponse } from '../../core/ApiResponse';
import crypto from 'crypto';
import UserRepo from '../../repository/UserRepo';
import { BadRequestError, AuthFailureError } from '../../core/ApiError';
import KeystoreRepo from '../../repository/KeystoreRepo';
import { createTokens } from '../../auth/authUtils';
import asyncHandler from '../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';

export default asyncHandler(async (req, res) => {
  const user = await UserRepo.findByEmail(req.body.email);
  if (!user) throw new BadRequestError('User not registered');
  if (!user.password) throw new BadRequestError('Credential not set');

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) throw new AuthFailureError('Authentication failure');

  const accessTokenKey = crypto.randomBytes(64).toString('hex');
  const refreshTokenKey = crypto.randomBytes(64).toString('hex');

  await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
  const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

  new SuccessResponse('Login Success', {
    user: _.pick(user, ['_id', 'name', 'roles', 'profilePicUrl']),
    tokens: tokens,
  }).send(res);
});
