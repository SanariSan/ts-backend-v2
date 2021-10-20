import { DashboardMain } from "./core/dashboard";
import { NoDataError } from "./core/errors";
import { PubSub } from "./events";
import { sleep } from "./helpers/util";
import { setupErrorHandle } from "./setupErrorHandle";

async function main() {
	// const dashboardMain = new DashboardMain();
	// dashboardMain.init();

	// setInterval(() => {
	// 	let id = ~~(Math.random() * 3);
	// 	dashboardMain.log({
	// 		optionName: id === 0 ? "test1" : id === 1 ? "test2" : "test3",
	// 		message: `Some random char ${String.fromCharCode(~~(Math.random() * 100))}`,
	// 	});
	// }, 100);

	const pubSubClient = new PubSub();
	pubSubClient.onByKey("message", (channel, errorLog) => {
		console.log(errorLog);
		// dashboardMain.log({
		// 	optionName: "test1",
		// 	message: errorLog,
		// });
	});
	pubSubClient.subscribe("error");

	// async function generateError() {
	// 	await sleep(10000);
	// 	generateError();
	throw new NoDataError("Some info");
	// }

	// generateError();
}

function init() {
	setupErrorHandle();
	main();
}

init();
