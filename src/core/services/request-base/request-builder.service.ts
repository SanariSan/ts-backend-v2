import { IRequest, TRequestMethod } from ".";

class RequestBuilder {
	private request: IRequest;

	constructor() {
		this.request = {};
	}

	setUrl({ url }: { url: string }) {
		this.request.url = url;
		return this;
	}

	makeMethod({ method }: { method: TRequestMethod }) {
		this.request.method = method;
		return this;
	}

	makeHeaders({ headers }: { headers: HeadersInit }) {
		this.request.headers = headers;
		return this;
	}

	makeBody({ data }: { data?: any }) {
		this.request.data = data;
		return this;
	}

	addLibSpecificOptions<T>({ ...args }: { args?: { [key: string]: T } }) {
		this.request = { ...this.request, ...args };
		return this;
	}

	getRequest() {
		return this.request;
	}
}

export { RequestBuilder };
