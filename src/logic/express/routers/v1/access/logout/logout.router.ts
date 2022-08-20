import { Router } from 'express';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import type { TRequestNarrowed, TRequestValidatedTokenAccess } from '../../../../express.type';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const logoutR = Router();

logoutR.delete(
  '/logout',
  asyncHandleMW<TRequestNarrowed>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.tokenAccess, EVALIDATION_TARGET.HEADER),
  ),
  asyncHandleMW<TRequestValidatedTokenAccess>(authentificateMW),
  // asyncHandleMW(StickRepos),
  // asyncHandleMW<
  //   TRequestValidatedTokenAccess & TRequestTokenPayload
  // >(accessLogoutMW),
);

export { logoutR };
