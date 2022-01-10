import type { NextFunction, Response } from 'express';
import type { TRequestTokenPayload } from '../../express.type';
import type { TRequestValidatedTokenAccess } from '../../schemes';

async function getPayload(token: string) {
  return Promise.resolve({ a: token, b: 2 });
}

export async function authentificateMW(
  req: TRequestValidatedTokenAccess,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const reqMutable = req as TRequestValidatedTokenAccess & TRequestTokenPayload;

  const token = req.headers.authorization.split(' ')[1];
  reqMutable.accessTokenPayload = await getPayload(token);
  next();
}
