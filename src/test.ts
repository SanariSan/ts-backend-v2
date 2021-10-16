import { CliNoEntryError } from "./core/errors";
import { CustomEventEmitter, PubSub } from "./events";

const pubSub = new PubSub();

function pubSubTest() {
	setInterval(() => {
		pubSub.publish("channel-test", "some text", { a: true });
	}, 500);

	// setTimeout(() => {
	// 	const e = new CustomEventEmitter();
	// 	e.offByKey("message", "app-init"); // or if we have keypubSub just pass it
	// }, 5000);
}

function test() {
	throw new CliNoEntryError("Custom Error Message Placeholer");
}

export { test, pubSubTest };
