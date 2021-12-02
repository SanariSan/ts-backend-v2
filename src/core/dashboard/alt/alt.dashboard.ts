import { DashboardInstancesController, DashboardLogsController } from '../controller';
import { makeControlsInfoBox, makeLogBox, makeWrapBox } from './box';

// TODO: review if (!smth) return; checks and replace with errors where needed
class DashboardAlt {
  private readonly dashboardTitle: string;

  private autoScrollLogs = true;

  private wrapBox: any;

  private wrapBoxCb: any;

  private logBox: any;

  private logBoxCb: any;

  private controlsInfoBox: any;

  constructor() {
    this.dashboardTitle = 'Dashboard-Alt';

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
    this.logBox = makeLogBox(this.wrapBox);
    this.controlsInfoBox = makeControlsInfoBox(this.wrapBox);
  }

  private configureBoxesCbs() {
    this.logBoxCb = (ch, key) => {
      this.autoScrollLogs = !this.autoScrollLogs;
    };

    this.wrapBoxCb = (el, ch, key): boolean | void => {
      if (el === this.wrapBox) {
        // Cancel propagation
        return false;
      }
    };
  }

  private allBoxesAssigned(): boolean {
    if (this.logBox) return true;
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
    this.logBox.focus();
  }

  public disappear() {
    this.removeBoxesListeners();
    this.wrapBox.detach();
  }

  public updateContent() {
    if (!this.allBoxesAssigned()) return;

    this.updateLogsBoxContent();
  }

  private setBoxesListeners() {
    this.wrapBox.on('element keypress', this.wrapBoxCb);
    this.logBox.on('key s', this.logBoxCb);
  }

  private removeBoxesListeners() {
    this.wrapBox.off('element keypress', this.wrapBoxCb);
    this.logBox.off('key s', this.logBoxCb);
  }

  private updateLogsBoxContent() {
    const logs = DashboardLogsController.getLogsBySources('all') as string[];

    this.logBox.setItems(logs);

    if (this.autoScrollLogs) this.logBox.setScrollPerc(100);

    this.logBox.setLabel(`  All Logs  `);
  }

  // *
  // runtime section
}

export { DashboardAlt };
