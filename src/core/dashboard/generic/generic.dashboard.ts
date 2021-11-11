import blessed from 'blessed';
import { sleep } from '../../../helpers/util';
import { TChildInstance } from './generic.dashboard.type';

class DashboardStatic {
  public static screen: any = null;

  public static childInstances = new Array<TChildInstance>();

  public static currChildIdx = 0;

  public static refreshRate: number = 1000 / 30; // 1000/fps

  public static async refreshScreen() {
    this.childInstances[this.currChildIdx].updateContent();
    this.screen.render();

    await sleep(this.refreshRate);
    this.refreshScreen();
  }
}

class Dashboard {
  private screenSwapCb: any;

  private screenExitCb: any;

  get screen() {
    return DashboardStatic.screen;
  }

  set screen(value) {
    DashboardStatic.screen = value;
  }

  get childInstances() {
    return DashboardStatic.childInstances;
  }

  get refreshRate() {
    return DashboardStatic.refreshRate;
  }

  get currChildIdx() {
    return DashboardStatic.currChildIdx;
  }

  set currChildIdx(value: number) {
    DashboardStatic.currChildIdx = value;
  }

  protected init(childInstance: TChildInstance) {
    // save child instance
    this.childInstances.push(childInstance);

    if (this.screen === null) {
      this.screen = blessed.screen({
        smartCSR: true,
        fullUnicode: true,
      });
      this.configureGlobalHotkeys();
      this.screen.title = childInstance.dashboardTitle;

      DashboardStatic.refreshScreen();
    }
  }

  private configureGlobalHotkeys() {
    this.configureScreenCbs();
    this.setScreenListeners();
  }

  private configureScreenCbs() {
    // shift+lef/right for dashboads swap
    this.screenSwapCb = (ch, key) => {
      this.hide();

      // carousel idx change
      if (key.full === 'S-left') {
        if (--this.currChildIdx < 0) this.currChildIdx = this.childInstances.length - 1;
      } else if (key.full === 'S-right' && ++this.currChildIdx >= this.childInstances.length)
        this.currChildIdx = 0;

      this.show();
    };

    // ctrl+c / escape = destroy screens + exit
    this.screenExitCb = (ch, key) => {
      this.screen.destroy();
      process.exit(0);
    };
  }

  private setScreenListeners() {
    this.screen.key(['S-left', 'S-right'], this.screenSwapCb);
    this.screen.key(['escape', 'C-c', 'q'], this.screenExitCb);
  }

  public show() {
    const newChild = this.childInstances[this.currChildIdx];
    newChild.appear(this.screen);

    this.screen.title = newChild.dashboardTitle;
  }

  public hide() {
    const oldChild = this.childInstances[this.currChildIdx];
    oldChild.disappear();
  }
}

export { Dashboard };
