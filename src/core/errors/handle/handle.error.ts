import fs from "fs";
import { ERROR_TYPE } from "../../errors";

async function handleError(e: Error) {
	console.log(`Error type: ${e.message}`);
	console.log(JSON.stringify(e, null, 2));
	// fs.appendFileSync("./log.txt", JSON.stringify(e) + "\n");

	switch (e.message) {
		case ERROR_TYPE.NO_DATA: {
			console.log("1");
			return;
		}
		case ERROR_TYPE.BAD_STATUS: {
			console.log("2");
			return;
		}
		case ERROR_TYPE.NO_RESPONSE: {
			console.log("3");
			return;
		}
		case ERROR_TYPE.NO_RESULT: {
			console.log("4");
			return;
		}
		case ERROR_TYPE.NO_SUCCESS: {
			console.log("5");
			return;
		}
		case ERROR_TYPE.CLI_NO_ENTRY: {
			console.log("6");
			return;
		}
		default: {
			console.log("unexpected");
			return;
		}
	}
}

export { handleError };
