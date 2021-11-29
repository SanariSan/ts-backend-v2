import { sendJson, sendMultipart, sendQs } from '../api-wrappers/sample';
import type { GenericError } from '../core/errors/generic';
import { LogLevel } from '../general.type';
import { logError } from '../helpers/pubsub';

async function exampleRequests() {
  const respJson = await sendJson().catch((error) => {
    logError(LogLevel.WARN, <GenericError>error);
  });
  const { request: jsonRequest, response: jsonResponse } = respJson || {};

  const respQs = await sendQs().catch((error) => {
    logError(LogLevel.WARN, <GenericError>error);
  });
  const { request: qsRequest, response: qsResponse } = respQs || {};

  const respMultipart = await sendMultipart().catch((error) => {
    logError(LogLevel.WARN, <GenericError>error);
  });
  const { request: multipartRequest, response: multipartResponse } = respMultipart || {};

  if (jsonResponse && jsonResponse.data) {
    console.dir({ data: jsonResponse.data }, { depth: 10, colors: true });
  }
  console.dir({ data: qsResponse?.data }, { depth: 10, colors: true });
  console.dir({ data: multipartResponse?.data }, { depth: 10, colors: true });
}

export { exampleRequests };
