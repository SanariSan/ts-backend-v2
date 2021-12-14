import { mapFindIdx, mapSlice, sleep } from '../../../../helpers/util';
import { LogsStorage } from '../../storage';

// TODO: move dashboard refresh HERE, pass messages from HERE
class CliLogsRepresenter {
  private static readonly sourcePrefix = 'cli';

  private static readonly lastAccessedLogId: Map<string, string> = new Map();

  private static readonly refreshRate = 1000;

  private static getSources() {
    const sources = Object.keys(LogsStorage.getStorage());
    return sources.filter((sourceName) => sourceName.startsWith(this.sourcePrefix));
  }

  private static getNewLogs(source: string) {
    const { lastLogId, lastAccessedLogId, logs } = LogsStorage.accessSource(source);
    const lastAccessedLogIdLocal = this.lastAccessedLogId.get(source);

    if (lastAccessedLogIdLocal === lastAccessedLogId) {
      return [];
    }

    const idx = mapFindIdx(logs, { key: lastAccessedLogIdLocal });
    const newLogs = [...mapSlice(logs, idx + 1).values()];

    this.lastAccessedLogId.set(source, lastLogId);

    return newLogs;
  }

  private static present(logsArr: Readonly<unknown[]>) {
    logsArr.forEach((log) => {
      console.log(log);
    });
  }

  public static async tick() {
    const sources = this.getSources();
    const newLogsArrs: unknown[][] = sources.map((source) => this.getNewLogs(source));

    if (newLogsArrs.length > 0) {
      newLogsArrs.forEach((logsArr) => {
        this.present(logsArr);
      });
    }

    await sleep(this.refreshRate);
    void this.tick();
  }
}

export { CliLogsRepresenter };
