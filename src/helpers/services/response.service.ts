import { AxiosError, AxiosResponse } from "axios";
import { ObjectAny } from "../../general.type";
import { ISuccessResponseReturnOptions } from "../../services/request-base";
import { ISuccessResponse, ISuccessResponseData } from "./response.helper.type";

const handleSuccessResponse = (
	response: AxiosResponse,
	{ getFull, getData, getHeaders }: ISuccessResponseReturnOptions,
): ISuccessResponse => {
	let returnObj: ISuccessResponse = {};

	if (!response) {
		throw new Error("handle it later");
	}
	if (getFull) {
		returnObj.fullResponse = response;
	}
	if (getData) {
		returnObj.data = response.data;
	}
	if (getHeaders) {
		returnObj.headers = response.headers;
	}

	return returnObj;
};

const handleErrorResponse = async (response: AxiosError): Promise<any> => {
	return Promise.reject(response.response);
};

export { handleSuccessResponse, handleErrorResponse };
