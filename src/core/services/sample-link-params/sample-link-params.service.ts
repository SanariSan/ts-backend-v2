import { ObjectAny } from "../../../general.type";
import { ISuccessResponse } from "../../../helpers/services";
import { axiosTestBase, handleRequest, ISuccessResponseReturnOptions } from "./../request-base";

const SampleLinkParamsRequest = (
	{ foo, bar, baz }: ObjectAny,
	{ ...rest }: ISuccessResponseReturnOptions,
): Promise<ISuccessResponse> =>
	handleRequest(axiosTestBase.post, { ...rest })({
		path: `/post/${foo}/${bar}/${baz}`,
		headers: { "Content-Type": "application/json" },
	});

export { SampleLinkParamsRequest };
