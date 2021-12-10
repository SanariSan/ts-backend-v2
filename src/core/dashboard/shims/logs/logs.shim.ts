import { DashboardLogsRepresenter } from '../../../logger/representers';

class DashboardLogsControllerShim {
  public static readonly channelControllerPrefix = 'dashboard';

  // cut controller prefix from options
  public static getSources() {
    return DashboardLogsRepresenter.getSources().map((sourceName) =>
      sourceName.slice(sourceName.indexOf('-') + 1),
    );
  }

  // add controller prefix to option
  public static getLogs(source: string) {
    const prefixedSource = `${this.channelControllerPrefix}-${source}`;
    return DashboardLogsRepresenter.getLogs(prefixedSource);
  }
}

export { DashboardLogsControllerShim };
