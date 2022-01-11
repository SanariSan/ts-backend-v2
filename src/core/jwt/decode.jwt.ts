import type { VerifyErrors } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';
import { promisify } from 'node:util';
import { JWTError } from './error/jwt/jwt.error';
import type { TVerify } from './jwt.core.type';

const verifyAsync = promisify(verify) as unknown as TVerify;

class JWTDecode {
  private readonly secret: string;

  private readonly token: string;

  constructor(token: string) {
    this.secret = process.env.JWT_SECRET;
    this.token = token;
  }

  public async verify() {
    await verifyAsync(this.token, this.secret, {
      algorithms: ['HS256'],
    }).catch((error: Readonly<VerifyErrors>) => {
      throw new JWTError(error.message, { ...error });
    });
  }
}

export { JWTDecode };
