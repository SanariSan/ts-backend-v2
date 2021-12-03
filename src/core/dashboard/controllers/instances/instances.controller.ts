import blessed from 'blessed';
import { sleep } from '../../../../helpers/util';
import type { TWidgetInstance } from './instances.controllers.type';

class DashboardInstancesController {
  private static screen: any = undefined;

  private static readonly dashboardInstances = new Array<TWidgetInstance>();

  private static currDashboardIdx = 0;

  private static readonly refreshRate: number = 1000 / 10; // 1000/fps

  private static screenSwapCb: any;

  private static screenExitCb: any;

  public static init(dashboardInstance: TWidgetInstance) {
    // save dashboard instance
    this.dashboardInstances.push(dashboardInstance);

    if (this.screen === undefined) {
      this.screen = blessed.screen({
        smartCSR: true,
        fullUnicode: true,
      });
      this.configureScreenCbs();
      this.setScreenListeners();
      void this.refreshScreen();
    }
  }

  public static show(dashboardInstance: TWidgetInstance) {
    this.updateCurrentDashboardIdx(dashboardInstance);
    dashboardInstance.appear(this.screen);
  }

  public static hide(dashboardInstance: TWidgetInstance) {
    this.updateCurrentDashboardIdx(dashboardInstance);
    dashboardInstance.disappear();
  }

  private static updateCurrentDashboardIdx(dashboardInstance: TWidgetInstance) {
    const currDashboardIdx = this.dashboardInstances.indexOf(dashboardInstance);
    this.currDashboardIdx = currDashboardIdx !== -1 ? currDashboardIdx : 0;
  }

  private static configureScreenCbs() {
    // shift+lef/right for dashboads swap
    this.screenSwapCb = (ch, key) => {
      this.hide(this.dashboardInstances[this.currDashboardIdx]);

      // carousel idx change
      if (key.full === 'S-left') {
        this.currDashboardIdx -= 1;
        this.currDashboardIdx =
          this.currDashboardIdx < 0 ? this.dashboardInstances.length - 1 : this.currDashboardIdx;
      } else if (key.full === 'S-right') {
        this.currDashboardIdx += 1;
        this.currDashboardIdx =
          this.currDashboardIdx >= this.dashboardInstances.length ? 0 : this.currDashboardIdx;
      }

      this.show(this.dashboardInstances[this.currDashboardIdx]);
    };

    // ctrl+c / escape = destroy screens + exit
    this.screenExitCb = () => {
      this.screen.destroy();
      process.exit(0);
    };
  }

  private static setScreenListeners() {
    this.screen.key(['S-left', 'S-right'], this.screenSwapCb);
    this.screen.key(['escape', 'C-c', 'q'], this.screenExitCb);
  }

  private static async refreshScreen() {
    this.dashboardInstances[this.currDashboardIdx].updateContent();
    this.screen.render();

    await sleep(this.refreshRate);
    void this.refreshScreen();
  }
}

export { DashboardInstancesController };
