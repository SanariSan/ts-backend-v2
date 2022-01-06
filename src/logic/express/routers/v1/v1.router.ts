import { Router } from 'express';
import { AccessRouter } from './access';

const v1 = Router();

v1.use('/access', AccessRouter);

export { v1 };
