import { isValidString } from '../../../helpers/util';
import { Sub } from '../../events';
import { LogsStorage } from '../../storage';
import type { ITargetLogger } from './generic.logger.type';

class GenericLogger {
  // initialize subscriber instance
  private static readonly subPoint = new Sub();

  public static subscribeChannel(
    targetLogger: ITargetLogger,
    channelName: string,
    optionNameCustom?: string,
  ) {
    // set source as custom name OR same as channel name client subscribing to
    // optional name might be useful if logs are stored in target logger by option name (example - dashboard, menu options)
    const source = isValidString(optionNameCustom) ? (optionNameCustom as string) : channelName;

    LogsStorage.checkIntializeStorage({ category: targetLogger.category, source });

    // sub to channel name, not option name (if presented)
    this.subPoint.subscribe(channelName);
    this.subPoint.onByKey((channel: string, logLevel, message: unknown) => {
      // if channel from where message just came === channel to which we subbed in closure
      if (channel === channelName) {
        // process message with channel/option name from closure and message
        targetLogger.processMessage({
          source,
          message,
        });
      }
    });
  }
}

export { GenericLogger };
