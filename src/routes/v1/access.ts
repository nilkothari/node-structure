import express from 'express';
import validator, { ValidationSource } from '../../helpers/validator';
import { Schema, Signup, Login, RefreshToken, Logout } from '../../services/access';
import authentication from '../../auth/authentication';

const router = express.Router();

router.post('/signup', validator(Schema.signup), Signup);
router.post('/login', validator(Schema.userCredential), Login);
router.post(
  '/refresh-token',
  validator(Schema.auth, ValidationSource.HEADER),
  validator(Schema.refreshToken),
  RefreshToken,
);
router.delete('/logout', authentication, Logout);

export default router;
