import { PubSub } from "../pubsub.events";
import { GenericError } from "../../../core/errors/generic";
import { LOG_LEVEL } from "../../../general.type";
import { TChannels } from "../pubsub.events.type";

class PubStatic {
	public static pub = new PubSub();
}

class PubGeneric {
	protected publish(channel: TChannels, logLevel: LOG_LEVEL, message: any) {
		PubStatic.pub.publish(channel, logLevel, message);
	}
	protected publishLog(logLevel: LOG_LEVEL, message: any) {
		this.publish("log", logLevel, message);
	}
	protected publishErrorExpected(logLevel: LOG_LEVEL, e: GenericError) {
		this.publish("error-expected", logLevel, e);
	}
	protected publishErrorUnexpected(logLevel: LOG_LEVEL, e: Error) {
		this.publish("error-unexpected", logLevel, e);
	}
}

export { PubGeneric };
