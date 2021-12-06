import type { GenericError } from '../../../core/errors/generic';
import { PubCore } from '../../../core/events/pubsub';
import type { ELOG_LEVEL } from '../../../general.type';

function publishCustom<T>(channel: string, logLevel: ELOG_LEVEL, message: T) {
  PubCore.publish({ channel, logLevel, message });
}
function publishLog<T>(logLevel: ELOG_LEVEL, message: T) {
  publishCustom('log', logLevel, message);
}
function publishError(logLevel: ELOG_LEVEL, e: GenericError) {
  publishCustom('error-expected', logLevel, e);
}
function publishErrorUnexpected(logLevel: ELOG_LEVEL, e: Readonly<Error>) {
  publishCustom('error-unexpected', logLevel, e);
}

export { publishCustom, publishLog, publishError, publishErrorUnexpected };
