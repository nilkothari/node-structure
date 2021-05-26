import { PrismaClient } from '@prisma/client';
import { PrismaRequest } from 'app-request';
import { Response, NextFunction } from 'express';

export default (req: PrismaRequest, _res: Response, next: NextFunction) => {
  req.prisma = new PrismaClient();
  next();
};
