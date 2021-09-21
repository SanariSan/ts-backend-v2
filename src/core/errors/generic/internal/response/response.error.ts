import { InternalError } from "../internal.error";
import { ERROR_TYPE } from "../../../error.const";

class ResponseError extends InternalError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Response error, resource returned bad status or message\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class NoDataError extends ResponseError {
	protected ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No (body) in response\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE.NO_DATA, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

class NoResponseError extends ResponseError {
	protected ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No response section in response\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE.NO_RESPONSE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

class NoResultError extends ResponseError {
	protected ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No result field in data(body)\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE.NO_RESULT, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

class BadStatusError extends ResponseError {
	protected ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Bad response status from server\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE.BAD_STATUS, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

export { NoDataError, NoResponseError, NoResultError, BadStatusError };
