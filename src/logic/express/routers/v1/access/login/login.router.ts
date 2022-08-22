import { Router } from 'express';
import { accessLoginCTR } from '../../../../controllers';
import { asyncHandleMW, EVALIDATION_TARGET, validateBySchemaAsyncMW } from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const loginR = Router();

loginR.post(
  '/login',
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  ),
  // asyncHandleMW(stickReposMW),
  asyncHandleMW(accessLoginCTR),
);

export { loginR };
