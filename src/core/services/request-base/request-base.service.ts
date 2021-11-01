import axios, { AxiosError } from "axios";
import { IGenericRequest } from ".";
import { DEFAULT_HEADERS, LIB_SPECIFIC_OPTIONS } from "./request-base.service.const";
import { RequestBuilder } from "./request-builder.service";

const requestGeneric = ({ method, host, path, data, headers, ...args }: IGenericRequest) => {
	const options = new RequestBuilder()
		.setUrl({ url: `${host}${path}` })
		.makeMethod({ method })
		.makeHeaders({ headers: { ...DEFAULT_HEADERS, ...headers } })
		.makeBody({ data })
		.addLibSpecificOptions<any>({
			...LIB_SPECIFIC_OPTIONS,
			...args,
		})
		.getRequest();

	return axios(options);
};

const request = {
	get: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, "method">) =>
		requestGeneric({ method: "GET", host, path, data, headers, ...args }),
	post: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, "method">) =>
		requestGeneric({ method: "POST", host, path, data, headers, ...args }),
	put: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, "method">) =>
		requestGeneric({ method: "PUT", host, path, data, headers, ...args }),
	delete: ({ host, path, data, headers, ...args }: Omit<IGenericRequest, "method">) =>
		requestGeneric({ method: "DELETE", host, path, data, headers, ...args }),
};

const bindedHostRequest = ({ host }: Pick<IGenericRequest, "host">) => ({
	get: ({ path, data, headers, ...args }: Omit<IGenericRequest, "method" | "host">) =>
		request.get({ host, path, data, headers, ...args }),
	post: ({ path, data, headers, ...args }: Omit<IGenericRequest, "method" | "host">) =>
		request.post({ host, path, data, headers, ...args }),
	put: ({ path, data, headers, ...args }: Omit<IGenericRequest, "method" | "host">) =>
		request.put({ host, path, data, headers, ...args }),
	delete: ({ path, data, headers, ...args }: Omit<IGenericRequest, "method" | "host">) =>
		request.delete({ host, path, data, headers, ...args }),
});

// handleRequest(bindedHostRequest.get({1,2,3}))
// const handleRequest = (req) => req.catch((res: AxiosError) => handleErrorResponse(res));

export { request, bindedHostRequest };
