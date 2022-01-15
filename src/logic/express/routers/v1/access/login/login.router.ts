import type { Request } from 'express';
import { Router } from 'express';
import { accessLoginCTR } from '../../../../controllers';
import { asyncHandleMW, EVALIDATION_TARGET, validateBySchemaAsyncMW } from '../../../../middleware';
import type { TRequestValidatedCredentials } from '../../../../schemes';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const loginR = Router();

loginR.post(
  '/login',
  asyncHandleMW<Request>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  ),
  // asyncHandleMW(stickReposMW),
  asyncHandleMW<TRequestValidatedCredentials>(accessLoginCTR),
);

export { loginR };
