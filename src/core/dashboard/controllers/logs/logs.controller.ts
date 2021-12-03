import { LogsStorage } from '../../../storage';

class DashboardLogsController {
  private static readonly category = 'dashboard';

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
}

export { DashboardLogsController };
