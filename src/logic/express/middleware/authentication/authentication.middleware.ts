import type { NextFunction, Response } from 'express';
import { jwtDecode } from '../../../../access-layer/jwt';
import { JWTError } from '../../../../core/jwt';
import type { TObjectUnknown } from '../../../../general.type';
import type { TRequestTokenPayload } from '../../express.type';
import type { TRequestValidatedTokenAccess } from '../../schemes';

export async function authentificateMW(
  req: TRequestValidatedTokenAccess,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const reqMutable = req as TRequestValidatedTokenAccess & TRequestTokenPayload;

  const token = req.headers.authorization.split(' ')[1];
  const accessTokenPayloadFull = await jwtDecode(token);

  if (accessTokenPayloadFull.prm !== undefined) {
    reqMutable.accessTokenPayloadPrm = JSON.parse(accessTokenPayloadFull.prm) as TObjectUnknown;
  } else {
    throw new JWTError('Malformed token property: prm', accessTokenPayloadFull);
  }

  next();
}
