import { LOG_LEVEL } from "./general.type";
import { logErrorUnexpected } from "./helpers/dashboard";

function setupErrorHandle() {
	process.on("uncaughtException", (e: Error) => {
		logErrorUnexpected(LOG_LEVEL.ERROR, e);
	});
	process.on("unhandledRejection", (e: Error) => {
		logErrorUnexpected(LOG_LEVEL.ERROR, e);
	});
}

export { setupErrorHandle };
