import { EventEmitter } from "stream";

class CustomEventEmitter extends EventEmitter {}

class PubSubStatic {
	// { PubSub instance : Set of channels names client subscribed to }
	public static clients = new Map<PubSub, Set<string>>();
}

class PubSub extends CustomEventEmitter {
	// util for getting Set of channels from client
	private getChannelsSet() {
		const set = PubSubStatic.clients.get(this);
		if (!set) throw new Error("weird");

		return set;
	}

	// initializes new client
	public createClient() {
		PubSubStatic.clients.set(this, new Set());

		return this;
	}

	// sends message to all clients who has channel in their Sets
	public publish(channel, ...args) {
		for (let [client, channels] of PubSubStatic.clients) {
			if (channels.has(channel)) {
				client.emit("message", channel, ...args);
			}
		}

		return this;
	}

	// adds channel to client
	public subscribe(channel) {
		this.getChannelsSet().add(channel);

		return this;
	}

	// removes channel from client
	public unsubscribe(channel) {
		this.getChannelsSet().delete(channel);

		return this;
	}

	// removes message listeners
	public clearListeners() {
		this.removeAllListeners("message");

		return this;
	}

	// removes client AND message listeners
	public quit() {
		PubSubStatic.clients.delete(this);
		this.clearListeners();

		return this;
	}
}

export { PubSub };
