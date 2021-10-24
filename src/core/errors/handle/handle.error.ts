import { ERROR, GenericError } from "..";
import { PubSub } from "../../../events";

function handleExpectedError(e: GenericError) {
	let errorLog = ``;

	errorLog += "##############################\n";
	errorLog += addPrefix("Error type", "->");
	errorLog += addPrefix(e.message, " |-");

	for (let [key, val] of Object.entries(JSON.parse(JSON.stringify(e)))) {
		errorLog += addPrefix(key, "->");
		errorLog += addPrefix(val, " |-");
	}

	errorLog += "##############################\n";

	const pubSubClient = new PubSub();
	pubSubClient.publish("dash-error", errorLog);
	// console.log(errorLog);

	// doSomething(e);
}

function handleUnexpectedError(e: GenericError) {
	let errorLog = ``;

	errorLog += "##############################\n";
	errorLog += addPrefix("Error type", "->");
	errorLog += addPrefix(e.message, " |-");
	errorLog += e.stack;
	errorLog += "##############################\n";

	const pubSubClient = new PubSub();
	pubSubClient.publish("dash-error", errorLog);
	// console.log(errorLog);

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

export { handleExpectedError, handleUnexpectedError };
