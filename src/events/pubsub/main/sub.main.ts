import { SubGeneric } from "../generic";
import { PubSub } from "../pubsub.events";
import { TChannels } from "../pubsub.events.type";

class SubMain extends SubGeneric {
	constructor() {
		super(new PubSub());
	}

	get sub() {
		return super.sub;
	}

	// exposing for cases when don't know exact amount and names of channels (spawning threads etc.)
	public subscribe(channel: TChannels) {
		super.subscribe(channel);
	}
	public unsubscribe(channel: TChannels) {
		super.unsubscribe(channel);
	}

	public subscribeLog() {
		super.subscribeLog();
	}
	public subscribeErrorExpected() {
		super.subscribeErrorExpected();
	}
	public subscribeErrorUnexpected() {
		super.subscribeErrorUnexpected();
	}
}

export { SubMain };
