import { request, IGenericRequest } from "../request-base";

const postService = ({
	host,
	path,
	data,
	headers,
	...args
}: Omit<IGenericRequest, "method">): Promise<any> =>
	request.post({
		data,
		host,
		path,
		headers,
		...args,
	});

export { postService };
