import { sendJson, sendMultipart, sendQs } from '../access-layer/services/sample';
import type { GenericError } from '../core/errors/generic';
import { LogLevel } from '../general.type';
import { logError } from '../helpers/pubsub';

async function exampleRequests() {
  const respJson = await sendJson().catch((error) => {
    logError(LogLevel.WARN, error as GenericError);
  });
  const { request: jsonRequest, response: jsonResponse } = respJson || {};

  const respQs = await sendQs().catch((error) => {
    logError(LogLevel.WARN, error as GenericError);
  });
  const { response: qsResponse } = respQs || {};

  const respMultipart = await sendMultipart().catch((error) => {
    logError(LogLevel.WARN, error as GenericError);
  });
  const { response: multipartResponse } = respMultipart || {};

  console.dir(
    {
      data: jsonResponse?.data,
      headersReq: jsonRequest?.headers,
      headersResp: jsonResponse?.headers,
    },
    { depth: 10, colors: true },
  );
  console.dir({ data: qsResponse?.data }, { depth: 10, colors: true });
  console.dir({ data: multipartResponse?.data }, { depth: 10, colors: true });
}

export { exampleRequests };
