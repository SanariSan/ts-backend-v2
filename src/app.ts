import { PubSub } from "./events";
import { sleep } from "./helpers/util";
import { setupErrorHandle } from "./setupErrorHandle";
import { pubSubTest } from "./test";

async function pubSubTestInit() {
	const pubSubClient = new PubSub();

	pubSubClient.onByKey(
		"message",
		(channel, ...args) => {
			console.log(`Message-app.ts channel: ${channel} | args: ${JSON.stringify(args)}`);
		},
		"app-init-key",
	);
	pubSubClient.subscribe("channel-test");

	pubSubTest();

	await sleep(4000);
	try {
		pubSubClient.offByKey("message", "app-init-key");
		pubSubClient.unsubscribe("channel-test");
	} catch (e) {
		pubSubClient.publish("error", e);
	}
}

function init() {
	setupErrorHandle();
	pubSubTestInit();
}

init();
