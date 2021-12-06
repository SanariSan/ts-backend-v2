import type { IPublishEntityCore } from '../../../events/pubsub';
import { SubCore } from '../../../events/pubsub';
import { LogsStorage } from '../../storage';
import type { ITargetLogger } from './generic.consumer.type';

class GenericLogsReceiver {
  // initialize subscriber instance
  private static readonly sub = new SubCore();

  public static subscribeChannel({
    targetLogsController,
    channelName,
    optionNameCustom,
    preInitializeStorage,
  }: {
    readonly targetLogsController: ITargetLogger;
    readonly channelName: string;
    readonly optionNameCustom?: string;
    readonly preInitializeStorage?: boolean;
  }) {
    const prefixedChannelName = `${targetLogsController.channelControllerPrefix}-${channelName}`;
    const prefixedSourceName = `${targetLogsController.channelControllerPrefix}-${
      optionNameCustom ?? prefixedChannelName
    }`;

    // initializing source as soon as user subscribed channel
    // might be useful if need to have options assigned, even if empty (example - dashboard menu options)
    if (preInitializeStorage ?? false) {
      LogsStorage.checkInitializeSource(prefixedSourceName);
    }

    this.sub.subscribe(channelName);
    this.sub.on('message', ({ channel, logLevel, message }: IPublishEntityCore) => {
      const prefixedChannelNameLocal = `${targetLogsController.channelControllerPrefix}-${channel}`;
      if (prefixedChannelNameLocal === prefixedChannelName) {
        // process message with channel/option name from closure and message
        void targetLogsController.processMessage({
          source: prefixedSourceName,
          logLevel,
          message,
        });
      }
    });
  }
}

export { GenericLogsReceiver };
