import { ObjectAny } from "../../../general.type";
import { ISuccessResponse } from "../../../helpers/services";
import { axiosTestBase, handleRequest, ISuccessResponseReturnOptions } from "./../request-base";

const SampleQueryParamsRequest = (
	{ queryParams }: ObjectAny,
	{ ...rest }: ISuccessResponseReturnOptions,
): Promise<ISuccessResponse> =>
	handleRequest(axiosTestBase.post, { ...rest })({
		path: "/post",
		extra: {
			params: queryParams,
		},
	});

export { SampleQueryParamsRequest };
