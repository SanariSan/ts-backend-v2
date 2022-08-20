import { Router } from 'express';
import { accessRegisterCTR } from '../../../../controllers';
import { asyncHandleMW, EVALIDATION_TARGET, validateBySchemaAsyncMW } from '../../../../middleware';
import type { TRequestNarrowed, TRequestValidatedCredentials } from '../../../../express.type';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const registerR = Router();

registerR.post(
  '/register',
  asyncHandleMW<TRequestNarrowed>(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  ),
  // asyncHandleMW(stickReposMW),
  asyncHandleMW<TRequestValidatedCredentials>(accessRegisterCTR),
);

export { registerR };
