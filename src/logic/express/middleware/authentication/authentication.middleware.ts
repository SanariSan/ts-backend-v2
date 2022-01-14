import type { NextFunction, Response } from 'express';
import { jwtDecode } from '../../../../access-layer/jwt';
import type { TRequestTokenPayload } from '../../express.type';
import type { TRequestValidatedTokenAccess } from '../../schemes';

export async function authentificateMW(
  req: TRequestValidatedTokenAccess,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const reqMutable = req as TRequestValidatedTokenAccess & TRequestTokenPayload;

  const token = req.headers.authorization.split(' ')[1];
  reqMutable.accessTokenPayload = await jwtDecode(token);
  next();
}
