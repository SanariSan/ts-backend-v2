import { LogsStorage } from '../../storage';

class DashboardLogsRepresenter {
  public static readonly channelControllerPrefix = 'dashboard';

  private static readonly lastAccessedLogId: string;

  public static getSources() {
    const sources = Object.keys(LogsStorage.getStorage());
    return sources.filter((sourceName) => sourceName.startsWith(this.channelControllerPrefix));
  }

  public static getLogs(source: string) {
    const { logs } = LogsStorage.accessSource(source);

    return [...logs.values()];
  }

  // TODO: move to other Representers, not needed in this one!!!
  // public static getNewLogs(source: string) {
  //   const { lastLogId, lastAccessedLogId, logs } = LogsStorage.accessSource(source);

  //   if (this.lastAccessedLogId === lastAccessedLogId) {
  //     return [];
  //   }

  //   const idx = mapFindIdx(logs, { key: this.lastAccessedLogId });
  //   const newLogs = [...mapSlice(logs, idx).values()];

  //   this.lastAccessedLogId = lastLogId;

  //   return newLogs;
  // }
}

export { DashboardLogsRepresenter };
