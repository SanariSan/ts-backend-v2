import { handleError } from "./core/errors";
import { PubSub } from "./events";
import { pubSubTest, test } from "./test";

const pubSubClient = new PubSub();

function init() {
	try {
		test();
	} catch (e: any) {
		handleError(e);
	}
}

function pubSubTestInit() {
	// keypubSub === app-init-key
	const keypubSub = pubSubClient.onByKey(
		"message",
		(channel, ...args) => {
			console.log(`Message-app.ts channel: ${channel} | args: ${JSON.stringify(args)}`);
		},
		"app-init-key",
	);
	pubSubClient.subscribe("channel-test");

	pubSubTest();

	setTimeout(() => {
		pubSubClient.offByKey("message", "app-init-key");
		pubSubClient.unsubscribe("channel-test");

		// to destroy pubSubClient with all subbed channels
		// so need to new PubSub() and subscribe again to use
		// listeners are still UP! Remove manually with
		// pubSubClient.removeAllListeners("message") or pubSubClient.offByKey("message", key);
		// pubSubClient.quit();
	}, 7000);
}

pubSubTestInit();
