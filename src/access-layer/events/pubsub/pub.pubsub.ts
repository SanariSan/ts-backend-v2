import type { GenericError } from '../../../core/errors/generic';
import { PubCore } from '../../../core/events/pubsub';
import type { ELOG_LEVEL } from '../../../general.type';

function logCustom<T>(channel: string, logLevel: ELOG_LEVEL, message: T) {
  PubCore.publish({ channel, logLevel, message });
}
function log<T>(logLevel: ELOG_LEVEL, message: T) {
  logCustom('log', logLevel, message);
}
function logError(logLevel: ELOG_LEVEL, e: GenericError) {
  logCustom('error-expected', logLevel, e);
}
function logErrorUnexpected(logLevel: ELOG_LEVEL, e: Readonly<Error>) {
  logCustom('error-unexpected', logLevel, e);
}

export { logCustom, log, logError, logErrorUnexpected };
