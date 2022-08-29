import { Router } from 'express';
import { testCTR } from '../../../controllers';
import { asyncHandleMW } from '../../../middleware';

const testR = Router();

testR.get(
  '/test-get',
  // asyncHandleMW(
  //   validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  // ),
  // asyncHandleMW(stickReposMW),
  asyncHandleMW(testCTR),
);

export { testR };
