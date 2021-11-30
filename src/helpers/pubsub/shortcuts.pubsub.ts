import type { GenericError } from '../../core/errors/generic';
import { PubStatic } from '../../core/events';
import type { LogLevel } from '../../general.type';

function logCustom(channel: string, logLevel: LogLevel, message: any) {
  PubStatic.publish(channel, logLevel, message);
}
function log(logLevel: LogLevel, message: any) {
  logCustom('log', logLevel, message);
}
function logError(logLevel: LogLevel, e: GenericError) {
  logCustom('error-expected', logLevel, e);
}
function logErrorUnexpected(logLevel: LogLevel, e: any) {
  logCustom('error-unexpected', logLevel, e);
}

export { logCustom, log, logError, logErrorUnexpected };
