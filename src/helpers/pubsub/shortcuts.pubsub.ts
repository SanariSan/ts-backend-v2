import { GenericError } from '../../core/errors/generic';
import { PubDashboard } from '../../core/events';
import { LogLevel } from '../../general.type';

const pubDashboard = new PubDashboard();
// TODO: logger
// const pubLogger = new PubLogger();
// const pubMain = new PubMain(); // in case none of above used, simple publisher

const log = (logLevel: LogLevel, message: any) => {
  pubDashboard.publishLog(logLevel, message);
  // pubLogger.publishLog(logLevel, message);
};
const logAlt = (logLevel: LogLevel, message: any) => {
  pubDashboard.publishLogAlt(logLevel, message);
};
const logError = (logLevel: LogLevel, e: GenericError) => {
  pubDashboard.publishErrorExpected(logLevel, e);
};
const logErrorUnexpected = (logLevel: LogLevel, e: any) => {
  pubDashboard.publishErrorUnexpected(logLevel, e);
};

export { log, logAlt, logError, logErrorUnexpected };
