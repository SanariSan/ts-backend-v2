import { Router } from 'express';
import { accessLoginCTR } from '../../../../controllers';
import type { TRequestNarrowed, TRequestValidatedCredentials } from '../../../../express.type';
import { asyncHandleMW, EVALIDATION_TARGET, validateBySchemaAsyncMW } from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const loginR = Router();

loginR.post(
  '/login',
  asyncHandleMW<TRequestNarrowed>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  ),
  // asyncHandleMW(stickReposMW),
  asyncHandleMW<TRequestValidatedCredentials>(accessLoginCTR),
);

export { loginR };
