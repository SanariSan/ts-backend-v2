import { sendJson, sendMultipart, sendQs } from "../api-wrappers/sample";
import { LOG_LEVEL } from "../general.type";
import { logError } from "../helpers/pubsub";

async function exampleRequests() {
	const respJson = await sendJson().catch((e) => {
		logError(LOG_LEVEL.WARN, e);
	});
	const { request: jsonRequest, response: jsonResponse } = respJson || {};

	const respQs = await sendQs().catch((e) => {
		logError(LOG_LEVEL.WARN, e);
	});
	const { request: qsRequest, response: qsResponse } = respQs || {};

	const respMultipart = await sendMultipart().catch((e) => {
		logError(LOG_LEVEL.WARN, e);
	});
	const { request: multipartRequest, response: multipartResponse } = respMultipart || {};

	console.dir({ data: jsonResponse?.data }, { depth: 10, colors: true });
	console.dir({ data: qsResponse?.data }, { depth: 10, colors: true });
	console.dir({ data: multipartResponse?.data }, { depth: 10, colors: true });
}

export { exampleRequests };
