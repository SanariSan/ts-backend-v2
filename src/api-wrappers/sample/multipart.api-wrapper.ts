import { BadStatusError, NoDataError } from '../../core/errors/generic';
import { request } from '../../core/services';
import { makeForm, parseResponse } from '../../helpers/services';

export const sendMultipart = async () => {
  const form = makeForm({ obj: { foo: 1, bar: 2, baz: 3 } });
  const response = await request
    .post({
      host: 'https://postman-echo.com',
      path: '/post',
      data: form,
      headers: {
        ...form.getHeaders(),
      },
    })
    .catch((error) => {
      // later parse error more carefully
      throw new BadStatusError(error ? error.statusText : null);
    });
  if (response) {
    return parseResponse({ response });
  }
  throw new NoDataError('No response in sendJson response');
};
