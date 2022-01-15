import type { VerifyErrors } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';
import { promisify } from 'node:util';
import { JWTError } from './error/jwt/jwt.error';
import type { TPayload, TSign } from './jwt.core.type';

const signAsync = promisify(sign) as unknown as TSign;

class JWTEncode {
  private readonly payload: TPayload;

  private readonly secret: string;

  constructor(payload: TPayload, secret: string) {
    this.secret = secret;
    this.payload = payload;
  }

  public sign() {
    return signAsync({ ...this.payload }, this.secret, {
      algorithm: 'HS256',
    }).catch((error: Readonly<VerifyErrors>) => {
      throw new JWTError(error.message, { ...error });
    });
  }
}

export { JWTEncode };
