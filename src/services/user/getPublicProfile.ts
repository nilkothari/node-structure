import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { Types } from 'mongoose';
import asyncHandler from '../../helpers/asyncHandler';
import _ from 'lodash';

export default asyncHandler(async (req: ProtectedRequest, res) => {
  const user = await UserRepo.findPublicProfileById(new Types.ObjectId(req.params.id));
  if (!user) throw new BadRequestError('User not registered');
  return new SuccessResponse('success', _.pick(user, ['name', 'profilePicUrl'])).send(res);
});
