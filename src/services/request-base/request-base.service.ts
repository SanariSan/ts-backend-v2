import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
	handleErrorResponse,
	handleSuccessResponse,
	ISuccessResponse,
} from "../../helpers/services";
import { DEFAULT_HEADERS } from "./request-base.service.const";
import { IRequest, ISuccessResponseReturnOptions } from "./request-base.service.type";

const axiosApiBase: AxiosInstance = axios.create({
	baseURL: process.env.BASE_URL,
	headers: DEFAULT_HEADERS,
	timeout: 5000,
});

const axiosTestBase: AxiosInstance = axios.create({
	baseURL: "https://postman-echo.com/",
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
	// todo: figure out better way? hard to read
	({ path, headers, data, extra }: IRequest): Promise<ISuccessResponse> =>
		req(path, data ? data : { ...extra, headers }, { ...extra, headers })
			.then((res: AxiosResponse) =>
				handleSuccessResponse(res, { getFull, getData, getHeaders }),
			)
			.catch(handleErrorResponse);

export { handleRequest, axiosApiBase, axiosTestBase };
