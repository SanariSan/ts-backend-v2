import { CliNoEntryError, NoDataError } from "../core/errors/generic";
import { handleErrorExpected, handleErrorUnexpected } from "../core/errors/handle";
import { SubMain } from "../core/events";
import { LOG_LEVEL } from "../general.type";
import { logError, logErrorUnexpected } from "../helpers/pubsub";

async function _exampleErrors() {
	console.log("Error #1\n");
	try {
		throw new NoDataError("Some info");
	} catch (e: any) {
		logError(LOG_LEVEL.WARN, e);
	}

	console.log("\nError #2\n");
	await new Promise((res, rej) => {
		throw new CliNoEntryError("Some more info");
	}).catch((e: any) => {
		logError(LOG_LEVEL.WARN, e);
	});

	// and even if not caught, will be caught
	console.log("\nError #3\n");
	const a: any = {};
	a.foo.bar = false;
}

// original handler
// import { setupErrorHandle } from "../setup-error-handle";

function setupErrorHandle() {
	// this block can be placed here if not using dashboard or logger
	// just catching all errors here and console.logging them
	const sub = new SubMain();
	sub.subscribeErrorExpected();
	sub.subscribeErrorUnexpected();
	sub.sub.onByKey("message", (channel, logLevel, message) => {
		if (channel === "error-expected") {
			console.log(handleErrorExpected(message));
		} else if (channel === "error-unexpected") {
			// appendFileSync("./err.txt", JSON.stringify([message.message, message.stack]) + "\n");
			console.log(handleErrorUnexpected(message));
		}
	});

	// these are any error catchers
	process.on("uncaughtException", (e: Error) => {
		logErrorUnexpected(LOG_LEVEL.ERROR, e);
	});
	process.on("unhandledRejection", (e: Error) => {
		logErrorUnexpected(LOG_LEVEL.ERROR, e);
	});
}

function exampleErrors() {
	setupErrorHandle();
	_exampleErrors();
}

export { exampleErrors };
