import { Router } from 'express';
import type {
  TRequestNarrowed,
  TRequestValidatedTokenAccess,
  TRequestValidatedTokenRefresh,
} from '../../../../express.type';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const tokenRefreshR = Router();

tokenRefreshR.put(
  '/token-refresh',
  asyncHandleMW<TRequestNarrowed>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.tokenAccess, EVALIDATION_TARGET.HEADER),
  ),
  asyncHandleMW<TRequestValidatedTokenAccess>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.tokenRefresh, EVALIDATION_TARGET.BODY),
  ),
  asyncHandleMW<TRequestValidatedTokenAccess & TRequestValidatedTokenRefresh>(authentificateMW),
  // asyncHandleMW(StickRepos),
  // asyncHandleMW<
  //   TRequestValidatedTokenAccess & TRequestValidatedTokenRefresh & TRequestTokenPayload
  // >(accessTokenRefreshMW),
);

export { tokenRefreshR };
