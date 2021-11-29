import type { AxiosError, AxiosResponse } from 'axios';
import { LogLevel } from '../../general.type';
import { logErrorUnexpected } from '../pubsub';

const parseResponse = ({ response }: { response: AxiosResponse }) => ({
  request: {
    request: response.request,
    // data: response.request.data,
    headers: response.request._header,
  },
  response: {
    response,
    data: response.data,
    headers: response.headers,
  },
});

const handleErrorResponse = async (response: AxiosError): Promise<any> => {
  // temp, actually need to parse response and define what error is this
  logErrorUnexpected(LogLevel.WARN, response.message);

  // here will probably call some request related error definer, then reject defining result
  // so I can catch it in the place it's called and logError after
  return Promise.reject(response.response);
};

export { handleErrorResponse, parseResponse };
