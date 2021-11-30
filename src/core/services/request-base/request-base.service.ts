import axios from 'axios';
import type { IGenericRequest } from '.';
import { DEFAULT_HEADERS, LIB_SPECIFIC_OPTIONS } from './request-base.service.const';
import { RequestBuilder } from './request-builder.service';

// import { default as axios_ } from "axios";
// import { SocksProxyAgent } from "socks-proxy-agent";
// const httpsAgent = new SocksProxyAgent("socks://127.0.0.1:1080");
// const httpAgent = httpsAgent;
// const axios = axios_.create({ httpsAgent, httpAgent });

const requestGeneric = ({ method, host, path, data, headers, proxy, ...args }: IGenericRequest) => {
  const options = new RequestBuilder()
    .setUrl({ url: `${host}${path}` })
    .setMethod({ method })
    .setHeaders({ headers: { ...DEFAULT_HEADERS, ...headers } })
    .setBody({ data })
    .setProxy({ proxy, ...args })
    .setLibSpecificOptions({
      ...LIB_SPECIFIC_OPTIONS,
      ...args,
    })
    .getRequest();

  return axios(options);
};

const Request = {
  get: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, 'method'>) =>
    requestGeneric({ method: 'GET', host, path, data, headers, ...args }),
  post: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, 'method'>) =>
    requestGeneric({ method: 'POST', host, path, data, headers, ...args }),
  put: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, 'method'>) =>
    requestGeneric({ method: 'PUT', host, path, data, headers, ...args }),
  delete: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, 'method'>) =>
    requestGeneric({ method: 'DELETE', host, path, data, headers, ...args }),
};

const requestBindedHost = ({ host }: Pick<IGenericRequest, 'host'>) => ({
  get: ({ path, data, headers, ...args }: Omit<IGenericRequest, 'method' | 'host'>) =>
    Request.get({ host, path, data, headers, ...args }),
  post: ({ path, data, headers, ...args }: Omit<IGenericRequest, 'method' | 'host'>) =>
    Request.post({ host, path, data, headers, ...args }),
  put: ({ path, data, headers, ...args }: Omit<IGenericRequest, 'method' | 'host'>) =>
    Request.put({ host, path, data, headers, ...args }),
  delete: ({ path, data, headers, ...args }: Omit<IGenericRequest, 'method' | 'host'>) =>
    Request.delete({ host, path, data, headers, ...args }),
});

// handleRequest(bindedHostRequest.get({1,2,3}))
// const handleRequest = (req) => req.catch((res: AxiosError) => handleErrorResponse(res));

export { Request, requestBindedHost };
