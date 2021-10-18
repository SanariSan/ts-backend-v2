import { handleError } from "./core/errors";
import { PubSub } from "./events";

function setupErrorHandle() {
	const pubSubClient = new PubSub();

	pubSubClient.on("message", (channel, e) => {
		handleError(e);
	});
	process.on("uncaughtException", (e: Error) => {
		pubSubClient.publish("error", e);
	});
	process.on("unhandledRejection", (e: Error) => {
		pubSubClient.publish("error", e);
	});

	pubSubClient.subscribe("error");
}

export { setupErrorHandle };
