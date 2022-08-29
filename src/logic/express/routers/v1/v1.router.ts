import { Router } from 'express';
import { accessR } from './access';
import { testR } from './test';

const v1 = Router();

v1.use('/access', accessR);
v1.use('/test', testR);

export { v1 };
