import { handleError } from "./core/errors";
import { PubSub } from "./events";

function setupErrorHandle() {
	const pubSubClient = new PubSub();

	pubSubClient.on("message", (channel, e) => {
		handleError(e);
	});
	pubSubClient.subscribe("error");

	process.on("uncaughtException", (e: Error) => {
		pubSubClient.publish("error", e);
	});
	process.on("unhandledRejection", (e: Error) => {
		pubSubClient.publish("error", e);
	});
}

export { setupErrorHandle };
