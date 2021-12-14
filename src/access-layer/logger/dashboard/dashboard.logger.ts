import { DashboardLogsController } from '../../../core/logger/controllers';
import { GenericLogsReceiver } from '../../../core/logger/consumers';

function dashboardSubscribeChannel(channel: string) {
  GenericLogsReceiver.subscribeChannel({
    targetLogsController: DashboardLogsController,
    channel,
  });
}

function dashboardStart() {
  // void DashboardLogsRepresenter.tick();
}

export { dashboardSubscribeChannel, dashboardStart };
