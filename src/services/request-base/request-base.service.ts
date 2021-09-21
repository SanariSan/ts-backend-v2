import axios, { AxiosInstance, AxiosResponse } from "axios";
import { handleErrorResponse, handleSuccessResponse } from "../../helpers/services/response.helper";
import { ISuccessResponse } from "../../helpers/services/response.helper.type";
import { DEFAULT_HEADERS } from "../request-base/request-base.service.const";
import { IRequest, ISuccessResponseReturnOptions } from "./request-base.service.type";

const axiosApiBase: AxiosInstance = axios.create({
	baseURL: process.env.BASE_URL,
	headers: DEFAULT_HEADERS,
	timeout: 5000,
});

const handleRequest =
	(
		req,
		{
			getFull: getFull = false,
			getData: getData = false,
			getHeaders: getHeaders = false,
		}: ISuccessResponseReturnOptions,
	) =>
	({ path, headers, data, extra }: IRequest): Promise<ISuccessResponse> =>
		req(path, data ? data : { ...extra, headers }, { ...extra, headers })
			.then((res: AxiosResponse) =>
				handleSuccessResponse(res, { getFull, getData, getHeaders }),
			)
			.catch(handleErrorResponse);
export { handleRequest, axiosApiBase };
