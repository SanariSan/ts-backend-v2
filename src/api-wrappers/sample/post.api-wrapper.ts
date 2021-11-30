import type { AxiosError } from 'axios';
import { BadStatusError } from '../../core/errors/generic';
import { Request } from '../../core/services';
import { parseResponse } from '../../helpers/services';

async function sendJson() {
  const response = await Request.post({
    host: 'https://postman-echo.com',
    path: '/post',
    data: { foo: 1, bar: 2, baz: 3 },
  }).catch((error: AxiosError) => {
    // TODO: later parse error more carefully
    throw new BadStatusError(error.code ?? '');
  });

  return parseResponse({ response });
}

export { sendJson };
