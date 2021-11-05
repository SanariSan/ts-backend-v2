import { LogLevel } from '../../../../general.type';
import { GenericError } from '../../../errors/generic';
import { PubGeneric } from '../generic';
import { TChannels } from '../pubsub.events.type';

// in case neither dashboard nor logger used, so you can publish simple errors
class PubMain extends PubGeneric {
  constructor() {
    super();
  }

  // exposing for cases when don't know exact amount and names of channels (spawning threads etc.)
  public publish(channel: TChannels, logLevel: LogLevel, message: string) {
    super.publish(channel, logLevel, message);
  }

  public publishLog(logLevel: LogLevel, message: any) {
    super.publishLog(logLevel, message);
  }

  public publishErrorExpected(logLevel: LogLevel, e: GenericError) {
    super.publishErrorExpected(logLevel, e);
  }

  public publishErrorUnexpected(logLevel: LogLevel, e: Error) {
    super.publishErrorUnexpected(logLevel, e);
  }
}

export { PubMain };
