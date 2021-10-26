import { AxiosResponse } from "axios";
import { BadStatusError, NoDataError } from "../core/errors/generic";
import { SampleFormRequest } from "../services";
import { ISample } from "./api-wrappers.type";

const sendForm = async () => {
	const resp = await SampleFormRequest(
		{ formParams: { foo: 1, bar: 2, baz: 3 } },
		{ getData: true, getFull: true, getHeaders: true },
	).catch((e: AxiosResponse) => {
		return Promise.reject(new BadStatusError(e ? e.statusText : null));
	});

	let a: ISample = {};

	if (resp.fullResponse && resp.data && resp.headers) {
		return {
			status: true,
			fullResponse: resp.fullResponse,
			headers: resp.headers,
			data: resp.data,
		};
	} else {
		return Promise.reject(new NoDataError("No data in sendForm response"));
	}
};

export { sendForm };
