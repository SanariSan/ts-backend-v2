import type { Request } from 'express';
import { Router } from 'express';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import type {
  TRequestValidatedTokenAccess,
  TRequestValidatedTokenRefresh,
} from '../../../../schemes';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const tokenRefreshR = Router();

tokenRefreshR.put(
  '/token-refresh',
  asyncHandleMW<Request>(
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
