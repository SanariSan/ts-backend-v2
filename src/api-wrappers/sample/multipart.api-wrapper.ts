import { BadStatusError, NoDataError } from "../../core/errors/generic";
import { request } from "../../core/services";
import { makeForm, parseResponse } from "../../helpers/services";

const sendMultipart = async () => {
	const form = makeForm({ obj: { foo: 1, bar: 2, baz: 3 } });
	const response = await request
		.post({
			host: "https://postman-echo.com",
			path: "/post",
			data: form,
			headers: {
				...form.getHeaders(),
			},
		})
		.catch((e) => {
			// later parse error more carefully
			throw new BadStatusError(e ? e.statusText : null);
		});
	if (response) {
		return parseResponse({ response });
	}
	throw new NoDataError("No response in sendJson response");
};

export { sendMultipart };
