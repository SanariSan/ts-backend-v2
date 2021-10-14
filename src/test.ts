import { PubSub } from "./events";

const pubSub = new PubSub();
async function test() {
	setInterval(() => {
		pubSub.publish("testChannel", 12345);
		pubSub.publish("2nd", 777);
	}, 1000);
}

export { test };
