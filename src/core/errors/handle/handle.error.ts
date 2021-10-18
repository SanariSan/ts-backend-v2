import { GenericError, ERROR } from "..";

function handleError(e: GenericError) {
	console.log("##############################");
	console.log(`Error type: ${e.message}`);
	logMultiline("Error type", "->");
	logMultiline(e.message, " |-");

	for (let [key, val] of Object.entries(JSON.parse(JSON.stringify(e)))) {
		logMultiline(key, "->");
		logMultiline(val, " |-");
	}

	doSomething(e);
	console.log("##############################");
	// fs.appendFileSync("./log.txt", JSON.stringify(e) + "\n");
}

function logMultiline(param, d) {
	`${param}`
		.split("\n")
		.filter((el) => el.length)
		.forEach((el) => console.log(`${d}${el}`));
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
			return;
		}
	}
}

export { handleError };
