import { Router } from 'express';
// import {
//   AccessChangePassword,
//   AccessLogin,
//   AccessLogout,
//   AccessRefresh,
//   AccessRegister,
// } from '../../../controllers/access';
// import { Authentificate, StickRepos } from '../../../../middleware';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../middleware';
import { SCHEMAS_ACCESS } from '../../../schemes';

const accessRouter = Router();

accessRouter.post(
  '/register',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEMAS_ACCESS.signup, EVALIDATION_TARGET.BODY)),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(AccessRegister),
);
accessRouter.post(
  '/login',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEMAS_ACCESS.login, EVALIDATION_TARGET.BODY)),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(AccessLogin),
);

accessRouter.put(
  '/refresh',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEMAS_ACCESS.auth, EVALIDATION_TARGET.HEADER)),
  asyncHandleMW(validateBySchemaAsyncMW(SCHEMAS_ACCESS.refresh, EVALIDATION_TARGET.BODY)),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(AccessRefresh),
);
accessRouter.post(
  '/change-password',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEMAS_ACCESS.auth, EVALIDATION_TARGET.HEADER)),
  asyncHandleMW(authentificateMW),
  asyncHandleMW(validateBySchemaAsyncMW(SCHEMAS_ACCESS.changePassword, EVALIDATION_TARGET.BODY)),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(Authentificate),
  // asyncMWHandle(AccessChangePassword),
);
accessRouter.delete(
  '/logout',
  asyncHandleMW(validateBySchemaAsyncMW(SCHEMAS_ACCESS.auth, EVALIDATION_TARGET.HEADER)),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(Authentificate),
  // asyncMWHandle(AccessLogout),
);

export { accessRouter };
