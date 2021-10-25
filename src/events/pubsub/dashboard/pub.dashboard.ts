import { PubGeneric } from "..";
import { GenericError } from "../../../core/errors";
import { LOG_LEVEL } from "../../../general.type";

class PubDashboard extends PubGeneric {
	constructor() {
		super();
	}

	public publishLog(logLevel: LOG_LEVEL, message: any, ...args) {
		// custom channel for dashboard only + base log event if someone listening for it, can remove
		super.publish("dash-log", message, ...args);
		super.publishLog(logLevel, message, ...args);
	}
	public publishErrorExpected(logLevel: LOG_LEVEL, e: GenericError, ...args) {
		// custom channel for dashboard only + base err event if someone listening for it, can remove
		super.publish("dash-error-expected", ...args);
		super.publishErrorExpected(logLevel, e, ...args);
	}
	public publishErrorUnexpected(logLevel: LOG_LEVEL, e: Error, ...args) {
		// custom channel for dashboard only + base err event if someone listening for it, can remove
		super.publish("dash-error-unexpected", ...args);
		super.publishErrorUnexpected(logLevel, e, ...args);
	}
}

export { PubDashboard };
