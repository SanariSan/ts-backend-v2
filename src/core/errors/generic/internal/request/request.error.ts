import { InternalError } from "../internal.error";
import { ERROR_TYPE } from "../../../error.const";

class RequestError extends InternalError {
	protected ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION) {
		ERROR_DESCRIPTION = `Request error, failed before or during sending\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE.REQUEST, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

export { RequestError };
