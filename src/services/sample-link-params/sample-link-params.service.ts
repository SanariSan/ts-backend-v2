import { ObjectAny } from "../../general.type";
import { ISuccessResponse } from "../../helpers/services";
import { axiosApiBase, handleRequest, ISuccessResponseReturnOptions } from "./../request-base";

const SampleLinkParamsRequest = (
	{ foo, bar, baz }: ObjectAny,
	{ ...rest }: ISuccessResponseReturnOptions,
): Promise<ISuccessResponse> =>
	handleRequest(axiosApiBase.get, { ...rest })({
		path: `/200/${foo}/${bar}/${baz}`,
		headers: { "Content-Type": "application/json" },
	});

export { SampleLinkParamsRequest };
