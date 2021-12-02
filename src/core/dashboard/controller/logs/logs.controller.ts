import { isValidString } from '../../../../helpers/util';
import { Sub } from '../../../events';
import { LogsStorage } from '../../../logs';
import type { ILogEntity } from './logs.controller.type';

class DashboardLogsController {
  private static readonly category = 'dashboard';

  // initialize subscriber instance
  private static readonly subPoint = new Sub();

  public static getLogsBySources(source?: string):
    | {
        [key: string]: string[];
      }
    | string[] {
    return LogsStorage.getLogsStorage({
      category: this.category,
      property: 'sources',
      source,
    }) as
      | {
          [key: string]: string[];
        }
      | string[];
  }

  private static addLogsBySource(source: string, logsArr: readonly string[]) {
    const logsBySource = this.getLogsBySources(source) as string[];

    LogsStorage.setLogsStorage({
      category: this.category,
      property: 'sources',
      source,
      value: [...logsBySource, ...logsArr],
    });
  }

  public static subscribeChannel(channelCustom: string, optionNameCustom?: string) {
    // menu option name to later represent in dashboard
    const source = isValidString(optionNameCustom) ? (optionNameCustom as string) : channelCustom;

    LogsStorage.checkIntializeStorage({ category: this.category, source });

    // sub to channel name, not option name (const source)
    this.subPoint.subscribe(channelCustom);
    this.subPoint.onByKey((channel: string, logLevel, message) => {
      // if channel from where message just came === channel to which we subbed in closure
      if (channel === channelCustom) {
        // process message with option name from closure and message converted .toString()
        this.processMessage({
          optionName: source,
          message: String(message),
        });
      }
    });
  }

  private static processMessage(entity: ILogEntity) {
    const logsArr = this.formatMessage(entity.message, 87);

    // push log line to object containing logs per id
    this.addLogsBySource(entity.optionName, logsArr);
    this.addLogsBySource('all', logsArr);
  }

  private static formatMessage(str: string, maxLineLength: number) {
    const piecesRegexp = new RegExp(`.{0,${maxLineLength}}`, 'g');
    const pieces = str.match(piecesRegexp) ?? [];

    return pieces.filter((el) => el.length).map((el, i) => `${i === 0 ? '*' : ' '}| ${el}`);
  }
}

export { DashboardLogsController };
