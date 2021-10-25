import { DashboardMain } from "./core/dashboard";
import { NoDataError } from "./core/errors";
import { LOG_LEVEL } from "./general.type";
import { log, logError } from "./helpers/dashboard";
import { getIntInRange, duplicateNTimes, randomHex, sleep } from "./helpers/util";
import { setupErrorHandle } from "./setup-error-handle";

async function main() {
	const dashboardMain = new DashboardMain();
	dashboardMain.init();

	async function pubLogs() {
		await sleep(500);
		pubLogs();
		log(LOG_LEVEL.INFO, `${duplicateNTimes(getIntInRange(1, 3), randomHex())}`);
	}
	pubLogs();

	async function generateError() {
		await sleep(10000);
		generateError();
		logError(LOG_LEVEL.ERROR, new NoDataError("Some error handled"), LOG_LEVEL.WARN);
		throw new NoDataError("Some error unhandled");
	}
	generateError();
}

function init() {
	setupErrorHandle();
	main();
}

init();
