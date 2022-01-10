import type { Request } from 'express';
import { Router } from 'express';
import { asyncHandleMW, EVALIDATION_TARGET, validateBySchemaAsyncMW } from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const loginR = Router();

loginR.post(
  '/login',
  asyncHandleMW<Request>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  ),
  // asyncHandleMW(stickReposMW),
  // asyncHandleMW<TRequestValidatedCredentials>(accessLoginMW),
);

export { loginR };
