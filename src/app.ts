import { sendJson, sendMultipart, sendQs } from "./api-wrappers/sample";
import { NoDataError } from "./core/errors/generic";
import { exampleRequests } from "./examples/requests";
import { LOG_LEVEL } from "./general.type";
import { log, logError } from "./helpers/pubsub";
import { duplicateNTimes, getIntInRange, randomHex, sleep } from "./helpers/util";
import { setupDashboard, setupErrorHandle } from "./setup";

async function main() {
	async function test() {
		await sleep(2000);
		test();
		log(
			LOG_LEVEL.INFO,
			`123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789`,
		);
	}
	test();

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

async function init() {
	exampleRequests();

	// setupErrorHandle();
	//setupDashboard();
	// main();

	// import from ./examples/
	// examplePromptCLI();
	// exampleErrors();
	// exampleEvents();
	// examplePubsub();
}

init();
