import { LogsStorage } from '../../storage';
import type { ILogEntity } from '../../consumers/generic';

// TODO: provide routines for changing max lines number for source in LogStorage
class DashboardLogsController {
  public static readonly channelControllerPrefix = 'dashboard';

  public static async processMessage(messageEntity: ILogEntity) {
    const { message, source } = messageEntity;

    const logsArr = this.formatMessage(String(message), 87);

    // push log lines to hash-log map
    await this.addLogsBySource(source, logsArr);
    await this.addLogsBySource(`${this.channelControllerPrefix}-all`, logsArr);
  }

  private static formatMessage(str: string, maxLineLength: number) {
    const piecesRegexp = new RegExp(`.{0,${maxLineLength}}`, 'g');
    const pieces = str.match(piecesRegexp) ?? [];

    return pieces.filter((el) => el.length).map((el, i) => `${i === 0 ? '*' : ' '}| ${el}`);
  }

  private static async addLogsBySource(source: string, logsArr: readonly string[]) {
    await LogsStorage.updateLogs(source, logsArr);
  }
}

export { DashboardLogsController };
