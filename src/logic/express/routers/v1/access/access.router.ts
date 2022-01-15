import type { Request } from 'express';
import { Router } from 'express';
import { accessRegisterCTR } from '../../../controllers';
import { asyncHandleMW, EVALIDATION_TARGET, validateBySchemaAsyncMW } from '../../../middleware';
import type { TRequestValidatedCredentials } from '../../../schemes';
import { SCHEME_AUTHENTICATION } from '../../../schemes';
import { changePasswordR } from './change-password';
import { loginR } from './login';
import { logoutR } from './logout';
import { registerR } from './register';
import { tokenRefreshR } from './token-refresh';

const accessR = Router();

accessR.use(registerR, loginR, logoutR, changePasswordR, tokenRefreshR);

export { accessR };
