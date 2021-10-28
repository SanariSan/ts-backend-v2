import { NoDataError } from "./core/errors/generic";
import { LOG_LEVEL } from "./general.type";
import { log, logError } from "./helpers/pubsub";
import { duplicateNTimes, getIntInRange, randomHex, sleep } from "./helpers/util";
import { setupDashboard } from "./setup-dashboard";
import { setupErrorHandle } from "./setup-error-handle";

async function main() {
	async function pubLogs() {
		await sleep(500);
		pubLogs();
		log(LOG_LEVEL.INFO, `${duplicateNTimes(getIntInRange(1, 3), randomHex())}`);
	}
	pubLogs();
	async function generateError() {
		await sleep(10000);
		generateError();
		logError(LOG_LEVEL.WARN, new NoDataError("Some error handled"));
		throw new Error("Some unexpected error thrown by itself");
	}
	generateError();
}

function init() {
	setupErrorHandle();
	setupDashboard();
	main();
}

init();
