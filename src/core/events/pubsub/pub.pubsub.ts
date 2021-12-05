import type { ELOG_LEVEL } from '../../../general.type';
import type { TChannels } from './internal';
import { PubSub } from './internal';

class PubStatic {
  private static readonly pub = new PubSub();

  public static publish(channel: TChannels, logLevel: ELOG_LEVEL, message: any) {
    this.pub.publish(channel, logLevel, message);
  }
}

export { PubStatic };
