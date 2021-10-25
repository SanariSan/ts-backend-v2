import { PubSub } from "..";
import { GenericError } from "../../../core/errors";
import { LOG_LEVEL } from "../../../general.type";
import { TChannels } from "../pubsub.events.type";

class PubStatic {
	public static pub = new PubSub();
}

class PubGeneric {
	protected publish(channel: TChannels, ...args) {
		PubStatic.pub.publish(channel, ...args);
	}
	protected publishLog(logLevel: LOG_LEVEL, message: any, ...args) {
		this.publish("log", logLevel, message, ...args);
	}
	protected publishErrorExpected(logLevel: LOG_LEVEL, e: GenericError, ...args) {
		this.publish("error-expected", logLevel, e, ...args);
	}
	protected publishErrorUnexpected(logLevel: LOG_LEVEL, e: Error, ...args) {
		this.publish("error-unexpected", logLevel, e, ...args);
	}
}

export { PubGeneric };
