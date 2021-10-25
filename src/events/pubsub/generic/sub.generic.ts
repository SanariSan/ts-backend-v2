import { PubSub } from "..";
import { GenericError } from "../../../core/errors";
import { LOG_LEVEL } from "../../../general.type";
import { TChannels } from "../pubsub.events.type";

class SubStatic {
	public static sub = new PubSub();
}

// todo!
// just copy of pub, most likely will look completely other way
class SubGeneric {
	protected subscribe(channel: TChannels, ...args) {
		SubStatic.sub.onByKey("eventName", () => {}, "key");
	}
	protected subscribeLog(logLevel: LOG_LEVEL, message: any, ...args) {}
	protected subscribeErrorExpected(logLevel: LOG_LEVEL, e: GenericError, ...args) {}
	protected subscribeErrorUnexpected(logLevel: LOG_LEVEL, e: Error, ...args) {}
}

export { SubGeneric };
