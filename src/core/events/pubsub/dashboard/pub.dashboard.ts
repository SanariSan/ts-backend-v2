import { LOG_LEVEL } from "../../../../general.type";
import { GenericError } from "../../../errors/generic";
import { PubGeneric } from "../generic";
import { TChannels } from "../pubsub.events.type";

class PubDashboard extends PubGeneric {
	constructor() {
		super();
	}

	// exposing for cases when don't know exact amount and names of channels (spawning threads etc.)
	public publish(channel: TChannels, logLevel: LOG_LEVEL, message: string) {
		super.publish(channel, logLevel, message);
	}

	public publishLog(logLevel: LOG_LEVEL, message: string) {
		// custom channel for dashboard only + base log event if someone listening for it
		super.publish("dash-log", logLevel, message);
		super.publishLog(logLevel, message);
	}
	public publishLogAlt(logLevel: LOG_LEVEL, message: string) {
		super.publish("dash-log-alt", logLevel, message);
		super.publishLog(logLevel, message);
	}
	public publishErrorExpected(logLevel: LOG_LEVEL, e: GenericError) {
		super.publish("dash-error-expected", logLevel, e);
		super.publishErrorExpected(logLevel, e);
	}
	public publishErrorUnexpected(logLevel: LOG_LEVEL, e: Error) {
		super.publish("dash-error-unexpected", logLevel, e);
		super.publishErrorUnexpected(logLevel, e);
	}
}

export { PubDashboard };
