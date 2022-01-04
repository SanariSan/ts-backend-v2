import type { TApiVersion } from './core/api/express/routers';

type TObjectG<T> = { [key: string]: T };
type TObjectString = TObjectG<string>;
type TObjectNumber = TObjectG<number>;
type TObjectBoolean = TObjectG<boolean>;
type TObjectUnknown = TObjectG<unknown>;
type TObjectAny = { [key: string]: any };

enum ELOG_LEVEL {
  ERROR,
  WARN,
  INFO,
  DEBUG,
  SILLY,
}

/* eslint-disable @typescript-eslint/naming-convention */
interface IEnvGeneral {
  NODE_ENV: 'production' | 'development';
  BASE_URL: string;
  API_VERSION: TApiVersion;
}
interface IEnvProd {
  NODE_ENV: 'production';
  CORS_URL_PROD: string;
  BUILD_PATH: string;
}
interface IEnvDev {
  NODE_ENV: 'development';
  CORS_URL_DEV: string;
}
type TEnv = NodeJS.ProcessEnv & IEnvGeneral & (IEnvProd | IEnvDev);
/* eslint-enable @typescript-eslint/naming-convention */

export type {
  TObjectG,
  TObjectString,
  TObjectNumber,
  TObjectBoolean,
  TObjectUnknown,
  TObjectAny,
  TEnv,
};
export { ELOG_LEVEL };
