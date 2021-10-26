import { AxiosResponse } from "axios";
import { BadStatusError, NoDataError } from "../core/errors/generic";
import { SampleLinkParamsRequest } from "../services";
import { ISample } from "./api-wrappers.type";

const sendLinkParams = async () => {
	const resp = await SampleLinkParamsRequest(
		{ foo: 1, bar: 2, baz: 3 },
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
		return Promise.reject(new NoDataError("No data in sendLinkParams"));
	}
};

export { sendLinkParams };
