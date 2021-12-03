import type { TWidgetInstance } from '../../../../core/dashboard/controllers';
import { DashboardInstancesController } from '../../../../core/dashboard/controllers';

function dashboardShow(widgetInstance: TWidgetInstance) {
  DashboardInstancesController.show(widgetInstance);
}

function dashboardHide(widgetInstance: TWidgetInstance) {
  DashboardInstancesController.hide(widgetInstance);
}

export { dashboardShow, dashboardHide };
