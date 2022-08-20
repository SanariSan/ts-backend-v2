import { Router } from 'express';
import type {
  TRequestNarrowed,
  TRequestValidatedCredentialsChange,
  TRequestValidatedTokenAccess,
} from '../../../../express.type';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const changePasswordR = Router();

changePasswordR.post(
  '/change-password',
  asyncHandleMW<TRequestNarrowed>(
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
