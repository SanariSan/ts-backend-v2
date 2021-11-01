import { AxiosRequestConfig } from "axios";
import { ObjectAny } from "../../../general.type";

type TRequestMethod = "GET" | "POST" | "PUT" | "DELETE";
interface IRequest {
	url?: string;
	method?: TRequestMethod;
	headers?: HeadersInit;
	data?: any;
}

interface IGenericRequest {
	method: TRequestMethod;
	host: string;
	path: string;
	data?: any;
	headers?: ObjectAny;
	args?: AxiosRequestConfig; //temp
}

export { IRequest, TRequestMethod, IGenericRequest };
