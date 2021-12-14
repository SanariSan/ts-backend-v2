import { LogsStorage } from '../../storage';

class DashboardLogsRepresenter {
  public static readonly sourcePrefix = 'dashboard';

  public static getSources() {
    const sources = Object.keys(LogsStorage.getStorage());
    return sources.filter((sourceName) => sourceName.startsWith(this.sourcePrefix));
  }

  public static getLogs(source: string) {
    const { logs } = LogsStorage.accessSource(source);

    return [...logs.values()];
  }
}

export { DashboardLogsRepresenter };
