import { AxiosResponse } from "axios";
import { BadStatusError, NoDataError } from "../core/errors";
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
		return { status: true };
	} else {
		return Promise.reject(new NoDataError("No data in createAppointment"));
	}
};

export { sendLinkParams };
