import type { NextFunction, Request, Response } from 'express';
import type { TObjectUnknown } from '../../../../general.type';
import type { TRequestAuthenticated } from '../../express.type';

async function getPayload(token: string) {
  return Promise.resolve({ a: 1, b: 2 });
}

export async function authentificateMW(
  req: TRequestAuthenticated,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.headers.authorization.split(' ')[1];

  req.accessTokenPayload = await getPayload(token);
  next();
}
