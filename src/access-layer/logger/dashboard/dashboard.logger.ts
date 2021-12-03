import { DashboardLogger } from '../../../core/logger/dashboard';
import { GenericLogger } from '../../../core/logger/generic';

function dashboardSubscribeChannel(channelCustom: string, optionNameCustom?: string) {
  GenericLogger.subscribeChannel(DashboardLogger, channelCustom, optionNameCustom);
}

export { dashboardSubscribeChannel };
