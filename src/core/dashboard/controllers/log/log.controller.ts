import { ObjectAny } from '../../../../general.type';
import { Sub } from '../../../events';
import { ILogEntity } from './log.controller.type';

class DashboardLogsController {
  private static logLinesByChannels: ObjectAny = {};
  private static logLinesGeneral: string[] = [];
  private static logLinesRaw: any[] = [];

  // initialize subscriber instance
  private static subPoint = new Sub();

  private static logLinesByOptionsMaxCount = 300;
  private static logLinesGeneralMaxCount = 500;
  private static logLinesRawMaxCount = 1000;

  public static getLogLinesByChannels() {
    return this.logLinesByChannels;
  }
  public static getLogLinesGeneral() {
    return this.logLinesGeneral;
  }
  public static getLogLinesRaw() {
    return this.logLinesRaw;
  }

  public static getLogOptions() {
    return Object.keys(this.logLinesByChannels);
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
    if (this.logLinesByChannels[optionName] === undefined) this.logLinesByChannels[optionName] = [];
  }

  private static saveMessage(entity: ILogEntity) {
    // clear and initialize logs box as empty array if nothing was logged before
    this.checkSetupOption(entity.optionName);

    const logLines = this.formatStr(entity.message, 87);
    const logLineRaw = entity.message;

    // push log line to object containing logs per id
    this.logLinesByChannels[entity.optionName].push(...logLines);
    this.logLinesGeneral.push(...logLines);
    this.logLinesRaw.push(logLineRaw);

    // shift oldest log line if limit exceeded
    for (const optionName in this.logLinesByChannels) {
      if (this.logLinesByChannels[optionName].length > this.logLinesByOptionsMaxCount) {
        this.logLinesByChannels[optionName].shift();
      }
    }

    if (this.logLinesGeneral.length > this.logLinesGeneralMaxCount) {
      this.logLinesGeneral.shift();
    }

    if (this.logLinesRaw.length > this.logLinesRawMaxCount) {
      this.logLinesRaw.shift();
    }
  }

  private static formatStr(str, maxLineLength) {
    const piecesRegexp = new RegExp(`.{0,${maxLineLength}}`, 'g');
    const pieces = str.match(piecesRegexp);

    return pieces.filter((el) => el.length).map((el, i) => `${i === 0 ? '*' : ' '}| ${el}`);
  }
}

export { DashboardLogsController };
