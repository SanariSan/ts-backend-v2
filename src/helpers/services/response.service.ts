import type { AxiosError, AxiosResponse } from 'axios';
import type { IParsedResponse } from '.';
import type { ObjectAny } from '../../general.type';
import { LogLevel } from '../../general.type';
import { logErrorUnexpected } from '../pubsub';

function parseResponse({ response }: { readonly response: unknown }): IParsedResponse {
  const castedResponse = response as AxiosResponse;
  return {
    request: {
      // data: response.request.data,
      request: castedResponse.request as ObjectAny,
      /* eslint-disable-next-line no-underscore-dangle */
      headers: (castedResponse.request as ObjectAny)._header as string,
      /* eslint-enable-next-line no-underscore-dangle */
    },
    response: {
      response: castedResponse,
      data: castedResponse.data as string | ObjectAny | undefined,
      headers: castedResponse.headers as ObjectAny,
    },
  };
}

function handleErrorResponse(response: Readonly<unknown>): Promise<AxiosResponse> {
  const castedResponse = response as AxiosError;

  logErrorUnexpected(LogLevel.WARN, castedResponse.message);

  return Promise.reject(castedResponse.response);
}

export { handleErrorResponse, parseResponse };
