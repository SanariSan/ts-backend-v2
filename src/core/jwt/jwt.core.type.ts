import type { JwtPayload, Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

type TSign = (
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret,
  options?: SignOptions | undefined,
) => Promise<string>;

type TVerify = (
  token: string,
  secretOrPublicKey: Secret,
  options: VerifyOptions,
) => Promise<JwtPayload>;

type TPayload = {
  iss?: string;
  aud?: string;
  sub?: string;
  iat?: number;
  exp?: number;
  prm?: string;
};

export type { TSign, TVerify, TPayload };
