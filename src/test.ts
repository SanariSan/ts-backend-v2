import { PubSub } from "./events";
import { sleep } from "./helpers/util";

async function pubSubTest() {
	const pubSubClient = new PubSub();

	setInterval(() => {
		pubSubClient.publish("channel-test", "some text", { a: true });
	}, 500);

	await sleep(6000);
	try {
		pubSubClient.offByKey("message", "app-init-key");
	} catch (e) {
		pubSubClient.publish("error", e);
	}
}

export { pubSubTest };
