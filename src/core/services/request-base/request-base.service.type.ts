interface IRequest {
	path?: string;
	headers?: {};
	data?: {};
	extra?: {};
}

interface ISuccessResponseReturnOptions {
	getFull?: boolean;
	getData?: boolean;
	getHeaders?: boolean;
}

export type { IRequest, ISuccessResponseReturnOptions };
