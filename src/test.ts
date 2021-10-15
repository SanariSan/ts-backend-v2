import { PubSub } from "./events";
import { CustomEventEmitter } from "./events/events";

const pubSub = new PubSub();

function test() {
	setInterval(() => {
		pubSub.publish("t", "some text");
	}, 500);

	setTimeout(() => {
		const e = new CustomEventEmitter();
		e.offByKey("message", "12345"); // or if we have keypubSub just pass it
	}, 5000);
}

export { test };
