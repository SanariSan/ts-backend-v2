import type { AxiosError } from 'axios';
import { stringify } from 'node:querystring';
import { BadStatusError } from '../../../core/errors/generic';
import { Request } from '../../../core/services';
import { parseResponse } from '../../../helpers/services';

async function sendQs() {
  const response = await Request.post({
    host: 'https://postman-echo.com',
    path: '/post',
    data: stringify({ foo: 1, bar: 2, baz: 3 }),
  }).catch((error: Readonly<unknown>) => {
    // later parse error more carefully
    throw new BadStatusError((error as AxiosError).code ?? '');
  });

  return parseResponse({ response });
}

export { sendQs };
