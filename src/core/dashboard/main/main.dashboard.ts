import { DashboardInstancesController, DashboardLogsController } from '../controller';
import { makeControlsInfoBox, makeLogBox, makeMenuBox, makeWrapBox } from './box';

class DashboardMain {
  private readonly dashboardTitle: string;

  private wrapBox: any;

  private wrapBoxCb: any;

  private menuBox: any;

  private menuBoxCb: any;

  private logBox: any;

  private logBoxCb: any;

  private controlsInfoBox: any;

  private autoScrollLogs = true;

  private boxesSwitch: any[] = [];

  private currentBoxIdx = 0;

  constructor() {
    this.dashboardTitle = 'Dashboard-Main';

    this.init();
  }

  // init configuration section
  // *

  protected init() {
    // save this instance, init screen if not done yet
    DashboardInstancesController.init(this);

    this.initializeBoxes();
    this.configureBoxesCbs();
  }

  private initializeBoxes() {
    // create predefined screen components = boxes
    this.wrapBox = makeWrapBox();
    this.menuBox = makeMenuBox(this.wrapBox);
    this.logBox = makeLogBox(this.wrapBox);
    this.controlsInfoBox = makeControlsInfoBox(this.wrapBox);

    // store switchable boxes
    this.boxesSwitch = [this.menuBox, this.logBox];
  }

  private configureBoxesCbs() {
    this.menuBoxCb = (item, i) => {
      this.logBox.clearItems();
    };

    this.logBoxCb = (ch, key) => {
      this.autoScrollLogs = !this.autoScrollLogs;
    };

    this.wrapBoxCb = (el, ch, key): boolean | void => {
      // remove accent from current box
      this.boxesSwitch[this.currentBoxIdx].style.border.fg = 'white';

      // carousel box idx change
      if (key.name === 'left') {
        if (--this.currentBoxIdx < 0) this.currentBoxIdx = this.boxesSwitch.length - 1;
      } else if (key.name === 'right' && ++this.currentBoxIdx >= this.boxesSwitch.length)
        this.currentBoxIdx = 0;

      // accent new current box
      this.boxesSwitch[this.currentBoxIdx].focus();
      this.boxesSwitch[this.currentBoxIdx].style.border.fg = 'blue';

      if (el === this.wrapBox) {
        // Cancel propagation
        return false;
      }
    };
  }

  private allBoxesAssigned(): boolean {
    if (this.menuBox && this.logBox && this.controlsInfoBox) return true;
    return false;
  }

  // *
  // init configuration section
  // -
  // runtime section
  // *

  public appear(screen) {
    screen.append(this.wrapBox);
    screen.title = this.dashboardTitle;

    this.setBoxesListeners();
    this.menuBox.focus();
  }

  public disappear() {
    this.removeBoxesListeners();
    this.wrapBox.detach();
  }

  public updateContent() {
    if (!this.allBoxesAssigned()) return;

    this.updateMenuBoxContent();
    this.updateLogsBoxContent();
  }

  private setBoxesListeners() {
    this.wrapBox.on('element keypress', this.wrapBoxCb);
    this.menuBox.on('select item', this.menuBoxCb);
    this.logBox.on('key s', this.logBoxCb);
  }

  private removeBoxesListeners() {
    this.wrapBox.off('element keypress', this.wrapBoxCb);
    this.menuBox.off('select item', this.menuBoxCb);
    this.logBox.off('key s', this.logBoxCb);
  }

  private updateMenuBoxContent() {
    // cut "all" source, not necessary!
    const options = Object.keys(DashboardLogsController.getLogsBySources()).filter(
      (el) => el !== 'all',
    );

    if (options.length === 0) {
      this.menuBox.setItems(['No options available']);
      return;
    }

    // if there's different amount of options came - clear old ones
    if (options.length != this.menuBox.items.length) {
      this.menuBox.clearItems();
      this.menuBox.setItems(options);
    }
  }

  private updateLogsBoxContent() {
    const logsByChannels = DashboardLogsController.getLogsBySources() as {
      [key: string]: string[];
    };

    // cut "all" source, not necessary!
    const logsByChannelsFiltered = {
      ...logsByChannels,
      all: undefined,
    };

    const options = Object.keys(logsByChannelsFiltered);
    const selectedMenuOption = options[this.menuBox.selected];
    const logs = logsByChannelsFiltered[selectedMenuOption];

    if (logs !== undefined) {
      this.logBox.setItems(logs);

      if (this.autoScrollLogs) {
        this.logBox.setScrollPerc(100);
      }
    }

    this.logBox.setLabel(`  ${selectedMenuOption} Logs  `);
  }

  // *
  // runtime section
}

export { DashboardMain };
