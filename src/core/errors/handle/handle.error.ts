import { GenericError } from "../generic";
import { ERROR } from "../error.type";

function handleErrorExpected(e: GenericError) {
	if (!e) return "Error is undefined";

	let errorLog = ``;

	errorLog += "##############################\n";
	errorLog += addPrefix("Error type", "->");
	errorLog += addPrefix(e.message, " |-");

	for (let [key, val] of Object.entries(JSON.parse(JSON.stringify(e)))) {
		errorLog += addPrefix(key, "->");
		errorLog += addPrefix(val, " |-");
	}

	errorLog += "##############################\n";

	return errorLog;

	// doSomething(e);
}

function handleErrorUnexpected(e: Error) {
	if (!e) return "Error is undefined";

	let errorLog = ``;

	errorLog += "##############################\n";
	errorLog += addPrefix("Error type", "->");
	errorLog += addPrefix(e.message, " |-");
	errorLog += e.stack;
	errorLog += "\n##############################\n";

	return errorLog;

	// doSomething(e);
}

function addPrefix(value, prefix) {
	return `${value}`
		.split("\n")
		.filter((el) => el.length)
		.reduce((acc, el) => (acc += `${prefix}${el}\n`), "");
}

function doSomething(e) {
	switch (e.message) {
		case ERROR.INTERNAL.RESPONSE.NO_DATA.VALUE: {
			return;
		}
		case ERROR.INTERNAL.RESPONSE.BAD_STATUS.VALUE: {
			return;
		}
		case ERROR.INTERNAL.RESPONSE.NO_RESPONSE.VALUE: {
			return;
		}
		case ERROR.INTERNAL.RESPONSE.NO_RESULT.VALUE: {
			return;
		}
		case ERROR.INTERNAL.CLI.PROMPT.NO_ENTRY.VALUE: {
			return;
		}
		default: {
			console.log("Error unexpected");
			console.log(e.stack);
			return;
		}
	}
}

export { handleErrorExpected, handleErrorUnexpected };
