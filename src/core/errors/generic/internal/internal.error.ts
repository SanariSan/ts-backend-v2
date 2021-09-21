import { GenericError } from "../generic.error";
import { ERROR_ORIGIN } from "../../error.const";

class InternalError extends GenericError {
	protected ERROR_ORIGIN: ERROR_ORIGIN;

	constructor(ERROR_TYPE, ERROR_DESCRIPTION) {
		ERROR_DESCRIPTION = `Error happened on server side, no user input took part\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
		this.ERROR_ORIGIN = ERROR_ORIGIN.INTERNAL;
	}
}

export { InternalError };
