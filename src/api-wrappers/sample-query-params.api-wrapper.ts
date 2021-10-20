import { AxiosResponse } from "axios";
import { BadStatusError, NoDataError } from "../core/errors";
import { SampleQueryParamsRequest } from "../services";
import { ISample } from "./api-wrappers.type";

const sendQueryParams = async () => {
	const resp = await SampleQueryParamsRequest(
		{
			queryParams: {
				foo: 1,
				bar: 2,
				baz: 3,
			},
		},
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
		return Promise.reject(new NoDataError("No data in sendQueryParams"));
	}
};

export { sendQueryParams };
