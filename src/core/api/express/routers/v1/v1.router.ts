import { Router } from 'express';
import { AccessRouter } from './access';
import { FilesRouter } from './fs';
import { GroupRouter } from './group';
import { GetInfoRouter } from './get-info';

const v1 = Router();

v1.use('/access', AccessRouter);
v1.use('/info', GetInfoRouter);
v1.use('/group', GroupRouter);
v1.use('/fs', FilesRouter);

export { v1 };
