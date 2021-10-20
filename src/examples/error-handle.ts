import { BadStatusError, CliNoEntryError, NoDataError } from "../core/errors";
import { PubSub } from "../events";
import { setupErrorHandle } from "../setupErrorHandle";

const pubSubClient = new PubSub();
async function errors() {
	console.log("Error #1\n");
	try {
		throw new NoDataError("Some info");
	} catch (e) {
		pubSubClient.publish("error", e);
	}

	console.log("\nError #2\n");
	await new Promise((res, rej) => {
		throw new CliNoEntryError("Some more info");
	}).catch((e) => {
		pubSubClient.publish("error", e);
	});

	// and even if not caught, will be caught
	console.log("\nError #3\n");
	throw new BadStatusError("Some other info");
}

async function init() {
	setupErrorHandle();
	errors();
}

init();
