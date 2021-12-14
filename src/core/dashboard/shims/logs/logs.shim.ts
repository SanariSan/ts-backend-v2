import { DashboardLogsRepresenter } from '../../../logger/representers';

class DashboardLogsControllerShim {
  public static readonly sourcePrefix = 'dashboard';

  // cut controller prefix from options
  public static getSources() {
    return DashboardLogsRepresenter.getSources().map((sourceName) =>
      sourceName.slice(sourceName.indexOf('-') + 1),
    );
  }

  // add controller prefix to option
  public static getLogs(source: string) {
    const prefixedSource = `${this.sourcePrefix}-${source}`;
    return DashboardLogsRepresenter.getLogs(prefixedSource);
  }
}

export { DashboardLogsControllerShim };
