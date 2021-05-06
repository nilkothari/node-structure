import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import _ from 'lodash';

export default asyncHandler(async (req: ProtectedRequest, res) => {
  const user = await UserRepo.findPublicProfileById(req.user._id);
  if (!user) throw new BadRequestError('User not registered');

  if (req.body.name) user.name = req.body.name;
  if (req.body.profilePicUrl) user.profilePicUrl = req.body.profilePicUrl;

  await UserRepo.updateInfo(user);
  return new SuccessResponse(
    'Profile updated',
    _.pick(user, ['name', 'profilePicUrl', 'roles']),
  ).send(res);
});
