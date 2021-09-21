import { ObjectAny } from "../../general.type";
import { ISuccessResponse } from "../../helpers/services";
import { axiosApiBase, handleRequest, ISuccessResponseReturnOptions } from "./../request-base";

const SampleQueryParamsRequest = (
	{ queryParams }: ObjectAny,
	{ ...rest }: ISuccessResponseReturnOptions,
): Promise<ISuccessResponse> =>
	handleRequest(axiosApiBase.get, { ...rest })({
		path: "/200",
		extra: {
			params: queryParams,
		},
	});

export { SampleQueryParamsRequest };
