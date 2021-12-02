import { EventEmitter } from 'node:events';
import { DashboardAlt } from '../core/dashboard/alt';
import {
  DashboardInstancesController,
  DashboardLogsController,
} from '../core/dashboard/controller';
import { DashboardMain } from '../core/dashboard/main';

function setupDashboard() {
  const main = new DashboardMain();
  void new DashboardAlt();

  // tweak listeners amount
  EventEmitter.defaultMaxListeners = 150;

  // subscribe to all channels needed (can add later, these are basic)
  DashboardLogsController.subscribeChannel('log', 'Logs-Main');
  DashboardLogsController.subscribeChannel('error-expected', 'Err-Expected');
  DashboardLogsController.subscribeChannel('error-unexpected', 'Err-Unexpected');

  // show preferred dashboard by passing instance
  DashboardInstancesController.show(main);
}

export { setupDashboard };
