import type { Request } from 'express';
import type { TObjectUnknown } from '../../general.type';
import type {
  TRequestValidatedTokenAccess,
  TRequestValidatedTokenRefresh,
  TRequestValidatedCredentials,
  TRequestValidatedCredentialsChange,
} from './schemes';

type TRequestTokenPayload = Request & {
  accessTokenPayload: TObjectUnknown;
};

type TRequest =
  | Request
  | TRequestValidatedTokenAccess
  | TRequestValidatedTokenRefresh
  | TRequestValidatedCredentials
  | TRequestValidatedCredentialsChange
  | TRequestTokenPayload;

export type { TRequestTokenPayload, TRequest };
