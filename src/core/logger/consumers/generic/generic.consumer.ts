import type { IPublishEntityCore } from '../../../events/pubsub';
import { SubCore } from '../../../events/pubsub';
import type { ITargetLogger } from './generic.consumer.type';

class GenericLogsReceiver {
  // initialize subscriber instance
  private static readonly sub = new SubCore();

  public static subscribeChannel({
    targetLogsController,
    channel: customChannelName,
  }: {
    readonly targetLogsController: ITargetLogger;
    readonly channel: string;
  }) {
    this.sub.subscribe(customChannelName);
    this.sub.on('message', ({ channel, logLevel, message }: IPublishEntityCore) => {
      if (channel === customChannelName) {
        // process message with channel/option name from closure and message
        void targetLogsController.processMessage({
          source: customChannelName,
          logLevel,
          message,
        });
      }
    });
  }
}

export { GenericLogsReceiver };
