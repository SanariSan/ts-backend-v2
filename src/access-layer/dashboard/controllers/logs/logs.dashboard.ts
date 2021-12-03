import { DashboardLogsController } from '../../../../core/dashboard/controllers';

function dashboardSubscribeChannel(channelCustom: string, optionNameCustom?: string) {
  DashboardLogsController.subscribeChannel(channelCustom, optionNameCustom);
}

export { dashboardSubscribeChannel };
