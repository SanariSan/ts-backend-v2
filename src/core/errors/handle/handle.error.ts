import { GenericError, ERROR } from "..";
import { PubSub } from "../../../events";

function handleError(e: GenericError) {
	let errorLog = ``;
	errorLog += "##############################\n";
	errorLog += `Error type: ${e.message}\n`;

	errorLog += formatMultiline("Error type", "->");
	errorLog += formatMultiline(e.message, " |-");

	for (let [key, val] of Object.entries(JSON.parse(JSON.stringify(e)))) {
		errorLog += formatMultiline(key, "->");
		errorLog += formatMultiline(val, " |-");
	}

	// doSomething(e);
	errorLog += "##############################\n";

	console.log(errorLog);

	const pubSubClient = new PubSub();
	pubSubClient.publish("error", errorLog);
}

function formatMultiline(param, d) {
	`${param}`
		.split("\n")
		.filter((el) => el.length)
		.reduce((acc, el) => (acc += `${d}${el}\n`), "");
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

export { handleError };
