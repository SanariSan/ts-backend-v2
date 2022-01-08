import type { Request } from 'express';
import type { TObjectUnknown } from '../../general.type';

type TRequestDB = Request & {
  db: TObjectUnknown;
};

type TRequestAuthorized = TRequestDB & {
  headers: {
    authorization: string;
  };
  accessTokenPayload: TObjectUnknown;
};

type TRequestAuthenticated = TRequestAuthorized & {
  accessLevel: number;
};

type TRequest = Request | TRequestDB | TRequestAuthorized | TRequestAuthenticated;

export type { TRequestDB, TRequestAuthorized, TRequestAuthenticated, TRequest };
