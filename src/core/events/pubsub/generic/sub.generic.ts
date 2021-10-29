import { PubSub } from "../pubsub.events";
import { TChannels } from "../pubsub.events.type";

class SubGeneric {
	private _sub: PubSub;
	constructor(sub: PubSub) {
		this._sub = sub;
	}

	get sub() {
		return this._sub;
	}

	protected subscribe(channel: TChannels) {
		this.sub.subscribe(channel);
	}
	protected unsubscribe(channel: TChannels) {
		this.sub.unsubscribe(channel);
	}

	protected subscribeLog() {
		this.subscribe("log");
	}
	protected unsubscribeLog() {
		this.unsubscribe("log");
	}

	protected subscribeErrorExpected() {
		this.subscribe("error-expected");
	}
	protected unsubscribeErrorExpected() {
		this.unsubscribe("error-expected");
	}

	protected subscribeErrorUnexpected() {
		this.subscribe("error-unexpected");
	}
	protected unsubscribeErrorUnexpected() {
		this.unsubscribe("error-unexpected");
	}
}

export { SubGeneric };
