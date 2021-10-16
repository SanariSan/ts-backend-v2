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
		case ERROR.INTERNAL.RESPONSE.NO_DATA.NAME: {
			return;
		}
		case ERROR.INTERNAL.RESPONSE.BAD_STATUS.NAME: {
			return;
		}
		case ERROR.INTERNAL.RESPONSE.NO_RESPONSE.NAME: {
			return;
		}
		case ERROR.INTERNAL.RESPONSE.NO_RESULT.NAME: {
			return;
		}
		case ERROR.INTERNAL.CLI.PROMPT.NO_ENTRY.NAME: {
			return;
		}
		default: {
			console.log("Error unexpected");
			return;
		}
	}
}

export { handleError };
