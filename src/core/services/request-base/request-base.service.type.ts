import type { AxiosProxyConfig, AxiosRequestConfig } from 'axios';
import type { ObjectAny } from '../../../general.type';

type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequest {
  method?: TRequestMethod;
  url?: string;
  headers?: HeadersInit;
  data?: any;
  proxy?: AxiosProxyConfig;
}

interface ICustomConfig {
  httpProxy: boolean;
  socksProxy: boolean;
}

interface IGenericRequest {
  method: TRequestMethod;
  host: string;
  path: string;
  data?: any;
  headers?: ObjectAny;
  proxy?: AxiosProxyConfig;
  args?: AxiosRequestConfig | ICustomConfig;
}

export type { IRequest, TRequestMethod, IGenericRequest, ICustomConfig };
