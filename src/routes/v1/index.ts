import express from 'express';
import apikey from '../../auth/apikey';
import user from './user';
import access from './access';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
router.use('/', apikey);
/*-------------------------------------------------------------------------*/

router.use('/access', access);
router.use('/user', user);

export default router;
