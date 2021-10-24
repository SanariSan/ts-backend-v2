import { handleExpectedError, handleUnexpectedError } from "./core/errors";
import { PubSub } from "./events";

function setupErrorHandle() {
	const pubSubClientExpected = new PubSub();
	const pubSubClientUnExpected = new PubSub();

	pubSubClientExpected.on("message", (channel, e) => {
		handleExpectedError(e);
	});
	pubSubClientExpected.subscribe("error");

	pubSubClientUnExpected.on("message", (channel, e) => {
		handleUnexpectedError(e);
	});
	pubSubClientUnExpected.subscribe("error");

	process.on("uncaughtException", (e: Error) => {
		// publishUnexpectedError
	});
	process.on("unhandledRejection", (e: Error) => {
		// publishUnexpectedError
	});
}

export { setupErrorHandle };
