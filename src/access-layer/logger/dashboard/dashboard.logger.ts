import { DashboardLogsController } from '../../../core/logger/controllers';
import { GenericLogsReceiver } from '../../../core/logger/consumers';

function dashboardSubscribeChannel(channel: string, optionNameCustom?: string) {
  GenericLogsReceiver.subscribeChannel({
    targetLogsController: DashboardLogsController,
    channelName: channel,
    optionNameCustom,
    preInitializeStorage: true,
  });
}

export { dashboardSubscribeChannel };
