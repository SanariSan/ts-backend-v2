import { GenericError } from "../../../core/errors/generic";
import { LOG_LEVEL } from "../../../general.type";
import { PubGeneric } from "../generic";
import { TChannels } from "../pubsub.events.type";

// in case neither dashboard nor logger used, so you can publish simple errors
class PubMain extends PubGeneric {
	constructor() {
		super();
	}

	// exposing for cases when don't know exact amount and names of channels (spawning threads etc.)
	public publish(channel: TChannels, logLevel: LOG_LEVEL, message: string) {
		super.publish(channel, logLevel, message);
	}

	public publishLog(logLevel: LOG_LEVEL, message: any) {
		super.publishLog(logLevel, message);
	}
	public publishErrorExpected(logLevel: LOG_LEVEL, e: GenericError) {
		super.publishErrorExpected(logLevel, e);
	}
	public publishErrorUnexpected(logLevel: LOG_LEVEL, e: Error) {
		super.publishErrorUnexpected(logLevel, e);
	}
}

export { PubMain };
