import { GenericError } from "../../core/errors";
import { PubDashboard } from "../../events";
import { LOG_LEVEL } from "../../general.type";

const pub = new PubDashboard();
// const pubLogger = new PubLogger(); // todo

const log = (logLevel: LOG_LEVEL, message: any, ...args) =>
	pub.publishLog(logLevel, message, ...args);
const logError = (logLevel: LOG_LEVEL, e: GenericError, ...args) => {
	// pubLogger.publishErrorExpected(e, logLevel, ...args);
	pub.publishErrorExpected(logLevel, e, ...args);
};
const logErrorUnexpected = (logLevel: LOG_LEVEL, e: Error, ...args) =>
	// pubLogger.publishErrorExpected(e, logLevel, ...args);
	pub.publishErrorUnexpected(logLevel, e, ...args);

export { log, logError, logErrorUnexpected };
