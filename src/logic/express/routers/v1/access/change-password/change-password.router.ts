import type { Request } from 'express';
import { Router } from 'express';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import type {
  TRequestValidatedCredentialsChange,
  TRequestValidatedTokenAccess,
} from '../../../../schemes';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const changePasswordR = Router();

changePasswordR.post(
  '/change-password',
  asyncHandleMW<Request>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.tokenAccess, EVALIDATION_TARGET.HEADER),
  ),
  asyncHandleMW<TRequestValidatedTokenAccess>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentialsChange, EVALIDATION_TARGET.BODY),
  ),
  asyncHandleMW<TRequestValidatedTokenAccess & TRequestValidatedCredentialsChange>(
    authentificateMW,
  ),
  // asyncHandleMW(StickRepos),
  // asyncHandleMW<
  //   TRequestValidatedTokenAccess & TRequestValidatedCredentialsChange & TRequestTokenPayload
  // >(accessChangePasswordMW),
);

export { changePasswordR };
