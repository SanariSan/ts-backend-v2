import { ObjectAny } from "../../general.type";
import { ISuccessResponse } from "../../helpers/services";
import { axiosApiBase, handleRequest, ISuccessResponseReturnOptions } from "./../request-base";

const SampleFormRequest = (
	{ formParams }: ObjectAny,
	{ ...rest }: ISuccessResponseReturnOptions,
): Promise<ISuccessResponse> =>
	handleRequest(axiosApiBase.post, { ...rest })({
		path: "/200",
		data: formParams,
	});

export { SampleFormRequest };
