import KeystoreRepo from '../../repository/KeystoreRepo';
import { ProtectedRequest } from 'app-request';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import asyncHandler from '../../helpers/asyncHandler';

export default asyncHandler(async (req: ProtectedRequest, res) => {
  await KeystoreRepo.remove(req.keystore._id);
  new SuccessMsgResponse('Logout success').send(res);
});
