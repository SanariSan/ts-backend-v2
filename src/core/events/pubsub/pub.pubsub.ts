import { LogLevel } from '../../../general.type';
import { PubSub, TChannels } from './internal';

class PubStatic {
  private static pub = new PubSub();

  public static publish(channel: TChannels, logLevel: LogLevel, message: any) {
    this.pub.publish(channel, logLevel, message);
  }
}

export { PubStatic };
