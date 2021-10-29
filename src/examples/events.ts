import { CustomEventEmitter } from "../core/events";

async function exampleEvents() {
	const emitter = new CustomEventEmitter();

	// if not passing key as 3-rd arg, random will be created and returned
	const key = emitter.onByKey("test-event", (...args) => {
		console.log(`Event: eName, args: ${JSON.stringify(args)}, key: ${key}`);
	});

	console.log(`Listeners for current emitter instance: ${emitter.listenerCount("test-event")}`);

	emitter.emit("test-event", "some text");
	emitter.offByKey("test-event", key);

	console.log(`Listeners for current emitter instance: ${emitter.listenerCount("test-event")}`);
}

export { exampleEvents };
