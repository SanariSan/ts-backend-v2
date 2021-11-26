import { ObjectAny } from '../../../../general.type';
import { Sub } from '../../../events';
import { ILogEntity } from './log.controller.type';

class DashboardLogsController {
  private static logLinesByOptions: ObjectAny = {};
  private static logLinesGeneral: string[] = [];

  // initialize subscriber instance
  private static subPoint = new Sub();

  private static logLinesByOptionsMaxCount = 300;
  private static logLinesGeneralMaxCount = 500;

  public static getLogLinesByOptions() {
    return this.logLinesByOptions;
  }
  public static getLogLinesGeneral() {
    return this.logLinesGeneral;
  }

  public static getOptions() {
    return Object.keys(this.logLinesByOptions);
  }

  public static subscribeChannel(channelCustom, customOptionName?: string) {
    // if need to show all options from start, even if no logs inside yet
    this.checkSetupOption(customOptionName || channelCustom);

    this.subPoint.subscribe(channelCustom);
    this.subPoint.onByKey((channel, logLevel, message) => {
      if (channel === channelCustom) {
        this.saveMessage({
          optionName: customOptionName || channel,
          message: String(message),
        });
      }
    });
  }

  private static checkSetupOption(optionName) {
    if (this.logLinesByOptions[optionName] === undefined) this.logLinesByOptions[optionName] = [];
  }

  private static saveMessage(entity: ILogEntity) {
    // clear and initialize logs box as empty array if nothing was logged before
    this.checkSetupOption(entity.optionName);

    const logLines = this.formatStr(entity.message, 87);

    // push log line to object containing logs per id
    this.logLinesByOptions[entity.optionName].push(...logLines);
    this.logLinesGeneral.push(...logLines);

    // shift oldest log line if limit exceeded
    for (const optionName in this.logLinesByOptions) {
      if (this.logLinesByOptions[optionName].length > this.logLinesByOptionsMaxCount) {
        this.logLinesByOptions[optionName].shift();
      }
    }

    if (this.logLinesGeneral.length > this.logLinesGeneralMaxCount) {
      this.logLinesGeneral.shift();
    }
  }

  private static formatStr(str, maxLineLength) {
    const piecesRegexp = new RegExp(`.{0,${maxLineLength}}`, 'g');
    const pieces = str.match(piecesRegexp);

    return pieces.filter((el) => el.length).map((el, i) => `${i === 0 ? '*' : ' '}| ${el}`);
  }
}

export { DashboardLogsController };
