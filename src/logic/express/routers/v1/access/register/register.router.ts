import type { Request } from 'express';
import { Router } from 'express';
import { asyncHandleMW, EVALIDATION_TARGET, validateBySchemaAsyncMW } from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const registerR = Router();

registerR.post(
  '/register',
  asyncHandleMW<Request>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  ),
  // asyncHandleMW(stickReposMW),
  // asyncHandleMW<TRequestValidatedCredentials>(accessRegisterMW),
);

export { registerR };
