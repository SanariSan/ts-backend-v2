import { InternalError } from "../internal.error";
import { ERROR_TYPE } from "../../../error.const";

class CliError extends InternalError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Cli error\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class CliPromptError extends CliError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Prompt error\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class CliDashboardError extends CliError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Dashboard error\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class CliPromptNoEntryError extends CliError {
	protected ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No entry found by key provided\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE.CLI_NO_ENTRY, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

export { CliError, CliPromptError, CliPromptNoEntryError };
