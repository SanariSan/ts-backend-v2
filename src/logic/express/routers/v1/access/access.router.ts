import { Router } from 'express';
import {
  AccessChangePassword,
  AccessLogin,
  AccessLogout,
  AccessRefresh,
  AccessRegister,
} from '../../../controllers/access';
// import { asyncMWHandle, Authentificate, StickRepos } from '../../../../middleware';
import { asyncMWHandle, validateBySchemaMW, EVALIDATION_TARGET } from '../../../middleware';
import { SCHEMAS_ACCESS } from '../../../../../joi';

const accessRouter = Router();

accessRouter.post(
  '/register',
  asyncMWHandle(validateBySchemaMW(SCHEMAS_ACCESS.signup, EVALIDATION_TARGET.BODY)),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(AccessRegister),
);
accessRouter.post(
  '/login',
  asyncMWHandle(validateBySchemaMW(SCHEMAS_ACCESS.login, EVALIDATION_TARGET.BODY)),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(AccessLogin),
);

accessRouter.put(
  '/refresh',
  asyncMWHandle(validateBySchemaMW(SCHEMAS_ACCESS.auth, EVALIDATION_TARGET.HEADER)),
  validateBySchemaMW(SCHEMAS_ACCESS.refresh, EVALIDATION_TARGET.BODY),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(AccessRefresh),
);
accessRouter.post(
  '/change-password',
  asyncMWHandle(validateBySchemaMW(SCHEMAS_ACCESS.auth, EVALIDATION_TARGET.HEADER)),
  validateBySchemaMW(SCHEMAS_ACCESS.changePassword, EVALIDATION_TARGET.BODY),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(Authentificate),
  // asyncMWHandle(AccessChangePassword),
);
accessRouter.delete(
  '/logout',
  asyncMWHandle(validateBySchemaMW(SCHEMAS_ACCESS.auth, EVALIDATION_TARGET.HEADER)),
  // asyncMWHandle(StickRepos),
  // asyncMWHandle(Authentificate),
  // asyncMWHandle(AccessLogout),
);

export { accessRouter };
