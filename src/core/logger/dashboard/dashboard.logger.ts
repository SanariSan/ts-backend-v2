import { LogsStorage } from '../../storage';
import type { ILogEntity } from '../generic';

// TODO: provide routines for changing max lines number for category in LogStorage
class DashboardLogger {
  public static readonly category = 'dashboard';

  public static processMessage(messageEntity: ILogEntity) {
    const { message, source } = messageEntity;

    const logsArr = this.formatMessage(String(message), 87);

    // push log line to object containing logs per id
    this.addLogsBySource(source, logsArr);
    this.addLogsBySource('all', logsArr);
  }

  private static addLogsBySource(source: string, logsArr: readonly string[]) {
    LogsStorage.updateLogsStorage({
      category: this.category,
      property: 'sources',
      source,
      value: logsArr,
    });
  }

  private static formatMessage(str: string, maxLineLength: number) {
    const piecesRegexp = new RegExp(`.{0,${maxLineLength}}`, 'g');
    const pieces = str.match(piecesRegexp) ?? [];

    return pieces.filter((el) => el.length).map((el, i) => `${i === 0 ? '*' : ' '}| ${el}`);
  }
}

export { DashboardLogger };
