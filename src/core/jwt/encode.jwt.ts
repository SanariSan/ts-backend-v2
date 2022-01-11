import type { VerifyErrors } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';
import { promisify } from 'node:util';
import { JWTError } from './error/jwt/jwt.error';
import type { TPayload, TSign } from './jwt.core.type';

const signAsync = promisify(sign) as unknown as TSign;

class JWTEncode {
  private readonly payload: TPayload;

  private readonly secret: string;

  constructor(payload: TPayload) {
    this.secret = process.env.JWT_SECRET;
    this.payload = payload;
  }

  public async sign() {
    await signAsync({ ...this.payload }, this.secret, {
      algorithm: 'HS256',
    }).catch((error: Readonly<VerifyErrors>) => {
      throw new JWTError(error.message, { ...error });
    });
  }
}

export { JWTEncode };
