import { ObjectAny } from "../../general.type";
import { ISuccessResponse } from "../../helpers/services";
import { axiosTestBase, handleRequest, ISuccessResponseReturnOptions } from "./../request-base";

const SampleFormRequest = (
	{ formParams }: ObjectAny,
	{ ...rest }: ISuccessResponseReturnOptions,
): Promise<ISuccessResponse> =>
	handleRequest(axiosTestBase.post, { ...rest })({
		path: "/post",
		data: formParams,
	});

export { SampleFormRequest };
