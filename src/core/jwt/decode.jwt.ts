import type { VerifyErrors } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import { promisify } from 'node:util';
import { JWTError } from './error/jwt/jwt.error';
import type { TVerify } from './jwt.core.type';

const verifyAsync = promisify(verify) as unknown as TVerify;

class JWTDecode {
  private readonly secret: string;

  private readonly token: string;

  constructor(token: string, secret: string) {
    this.secret = secret;
    this.token = token;
  }

  public verify() {
    return verifyAsync(this.token, this.secret, {
      algorithms: ['HS256'],
    }).catch((error: Readonly<VerifyErrors>) => {
      throw new JWTError(error.message, { ...error });
    });
  }
}

export { JWTDecode };
