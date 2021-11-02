import { BadStatusError, NoDataError } from "../../core/errors/generic";
import { request } from "../../core/services";
import { parseResponse } from "../../helpers/services";

const sendJson = async () => {
	const response = await request
		.post({
			host: "https://postman-echo.com",
			path: "/post",
			data: { foo: 1, bar: 2, baz: 3 },
		})
		.catch((e) => {
			// later parse error more carefully todo
			throw new BadStatusError(e ? e.statusText : null);
		});

	if (response) {
		return parseResponse({ response });
	}

	throw new NoDataError("No response in sendJson response");
};

export { sendJson };
