import express from 'express';
import access from './access';

const router = express.Router();

router.use('/access', access);

export default router;
