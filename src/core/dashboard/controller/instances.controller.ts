import blessed from 'blessed';
import { sleep } from '../../../helpers/util';
import type { TDashboardInstance } from './instances.controllers.type';

class DashboardInstancesController {
  private static screen: any = null;

  private static readonly dashboardInstances = new Array<TDashboardInstance>();

  private static currDashboardIdx = 0;

  private static readonly refreshRate: number = 1000 / 10; // 1000/fps

  private static screenSwapCb: any;

  private static screenExitCb: any;

  public static init(dashboardInstance: TDashboardInstance) {
    // save dashboard instance
    this.dashboardInstances.push(dashboardInstance);

    if (this.screen === null) {
      this.screen = blessed.screen({
        smartCSR: true,
        fullUnicode: true,
      });
      this.configureScreenCbs();
      this.setScreenListeners();
      this.refreshScreen();
    }
  }

  public static show(dashboardInstance: TDashboardInstance) {
    this.updateCurrentDashboardIdx(dashboardInstance);
    dashboardInstance.appear(this.screen);
  }

  public static hide(dashboardInstance: TDashboardInstance) {
    this.updateCurrentDashboardIdx(dashboardInstance);
    dashboardInstance.disappear();
  }

  private static async refreshScreen() {
    this.dashboardInstances[this.currDashboardIdx].updateContent();
    this.screen.render();

    await sleep(this.refreshRate);
    this.refreshScreen();
  }

  private static configureScreenCbs() {
    // shift+lef/right for dashboads swap
    this.screenSwapCb = (ch, key) => {
      this.hide(this.dashboardInstances[this.currDashboardIdx]);

      // carousel idx change
      if (key.full === 'S-left') {
        if (--this.currDashboardIdx < 0) this.currDashboardIdx = this.dashboardInstances.length - 1;
      } else if (
        key.full === 'S-right' &&
        ++this.currDashboardIdx >= this.dashboardInstances.length
      )
        this.currDashboardIdx = 0;

      this.show(this.dashboardInstances[this.currDashboardIdx]);
    };

    // ctrl+c / escape = destroy screens + exit
    this.screenExitCb = (ch, key) => {
      this.screen.destroy();
      process.exit(0);
    };
  }

  private static updateCurrentDashboardIdx(dashboardInstance: TDashboardInstance) {
    const currDashboardIdx = this.dashboardInstances.indexOf(dashboardInstance);
    this.currDashboardIdx = currDashboardIdx !== -1 ? currDashboardIdx : 0;
  }

  private static setScreenListeners() {
    this.screen.key(['S-left', 'S-right'], this.screenSwapCb);
    this.screen.key(['escape', 'C-c', 'q'], this.screenExitCb);
  }
}

export { DashboardInstancesController };
