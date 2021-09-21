import { ERROR_TYPE } from "../error.const";

class GenericError extends Error {
	protected ERROR_DESCRIPTION: string;
	protected ERROR_TIMESTAMP: number;
	protected ERROR_TIMESTAMP_HR: Date;

	constructor(ERROR_TYPE: ERROR_TYPE, ERROR_DESCRIPTION) {
		super(ERROR_TYPE);

		this.ERROR_DESCRIPTION = `General error level\n${ERROR_DESCRIPTION}`;
		this.ERROR_TIMESTAMP_HR = new Date();
		this.ERROR_TIMESTAMP = this.ERROR_TIMESTAMP_HR.getTime();
	}
}

export { GenericError };
