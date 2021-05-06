import express from 'express';
import validator, { ValidationSource } from '../../helpers/validator';
import { Schema, PublicProfile, Profile, Update } from '../../services/user';
import authentication from '../../auth/authentication';

const router = express.Router();

router.get('/public-profile/:id', validator(Schema.userId, ValidationSource.PARAM), PublicProfile);

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.get('/profile', Profile);
router.put('/update', validator(Schema.profile), Update);

export default router;
