import { DashboardMain } from "./core/dashboard";
import { NoDataError } from "./core/errors";
import { PubSub } from "./events";
import { sleep } from "./helpers/util";
import { setupErrorHandle } from "./setup-error-handle";

async function main() {
	const dashboardMain = new DashboardMain();
	dashboardMain.init();

	// setInterval(() => {}, 500);
	setInterval(() => {}, 500);

	const pubSubClientLog = new PubSub();

	async function generateError() {
		await sleep(10000);
		generateError();
		throw new NoDataError("Some info");
	}

	generateError();
}

function init() {
	setupErrorHandle();
	main();
}

init();
