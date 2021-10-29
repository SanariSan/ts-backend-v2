import { GenericError } from "../../core/errors/generic";
import { PubDashboard } from "../../core/events";
import { LOG_LEVEL } from "../../general.type";

const pubDashboard = new PubDashboard();
// const pubLogger = new PubLogger(); // todo
// const pubMain = new PubMain(); // in case none of above used, simple publisher

const log = (logLevel: LOG_LEVEL, message: any) => {
	pubDashboard.publishLog(logLevel, message);
	// pubLogger.publishLog(logLevel, message);
};
const logAlt = (logLevel: LOG_LEVEL, message: any) => {
	pubDashboard.publishLogAlt(logLevel, message);
};
const logError = (logLevel: LOG_LEVEL, e: GenericError) => {
	pubDashboard.publishErrorExpected(logLevel, e);
};
const logErrorUnexpected = (logLevel: LOG_LEVEL, e: Error) => {
	pubDashboard.publishErrorUnexpected(logLevel, e);
};

export { log, logAlt, logError, logErrorUnexpected };
