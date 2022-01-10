import { Router } from 'express';
import { accessR } from './access';

const v1 = Router();

v1.use('/access', accessR);

export { v1 };
