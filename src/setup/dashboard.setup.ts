import { EventEmitter } from 'node:events';
import {
  dashboardShow,
  dashboardSubscribeChannel,
  dashboardWidgetGet,
} from '../access-layer/dashboard';

function setupDashboard() {
  const MainWidget = dashboardWidgetGet('main');
  const AltWidget = dashboardWidgetGet('alt');
  const mainInstance = new MainWidget();
  const altInstance = new AltWidget();

  // tweak listeners amount
  EventEmitter.defaultMaxListeners = 150;

  // subscribe to all channels needed (can add later, these are basic)
  dashboardSubscribeChannel('log', 'Logs-Main');
  dashboardSubscribeChannel('error-expected', 'Err-Expected');
  dashboardSubscribeChannel('error-unexpected', 'Err-Unexpected');

  // show preferred dashboard by passing instance
  dashboardShow(mainInstance);
}

export { setupDashboard };
