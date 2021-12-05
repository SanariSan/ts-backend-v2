import type { GenericError } from '../../core/errors/generic';
import { PubStatic } from '../../core/events';
import type { ELOG_LEVEL } from '../../general.type';

function logCustom(channel: string, logLevel: ELOG_LEVEL, message: any) {
  PubStatic.publish(channel, logLevel, message);
}
function log(logLevel: ELOG_LEVEL, message: any) {
  logCustom('log', logLevel, message);
}
function logError(logLevel: ELOG_LEVEL, e: GenericError) {
  logCustom('error-expected', logLevel, e);
}
function logErrorUnexpected(logLevel: ELOG_LEVEL, e: any) {
  logCustom('error-unexpected', logLevel, e);
}

export { logCustom, log, logError, logErrorUnexpected };
