import { LogLevel } from '../../../../general.type';
import { GenericError } from '../../../errors/generic';
import { PubSub } from '../pubsub.events';
import { TChannels } from '../pubsub.events.type';

class PubStatic {
  public static pub = new PubSub();
}

class PubGeneric {
  protected publish(channel: TChannels, logLevel: LogLevel, message: any) {
    PubStatic.pub.publish(channel, logLevel, message);
  }

  protected publishLog(logLevel: LogLevel, message: any) {
    this.publish('log', logLevel, message);
  }

  protected publishErrorExpected(logLevel: LogLevel, e: GenericError) {
    this.publish('error-expected', logLevel, e);
  }

  protected publishErrorUnexpected(logLevel: LogLevel, e: Error) {
    this.publish('error-unexpected', logLevel, e);
  }
}

export { PubGeneric };
