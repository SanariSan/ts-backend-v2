import type { NextFunction, Response } from 'express';
import { sleep } from '../../../../helpers/util';
import type { TRequestValidatedCredentials } from '../../express.type';

export const testCTR = async (
  req: TRequestValidatedCredentials,
  res: Response,
  next: NextFunction,
) => {
  await sleep(15_000);
  res.json({ a: 1 });
  return;
};
