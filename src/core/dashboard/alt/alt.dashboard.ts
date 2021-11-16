import { formatStr } from '../../../helpers/dashboard';
import { GenericError } from '../../errors/generic';
import { handleErrorExpected, handleErrorUnexpected } from '../../errors/handle';
import { SubDashboard } from '../../events';
import { DashboardStatic } from '../static';
import { IAltLogEntity } from './alt.dashboard.type';
import { makeControlsInfoBox, makeLogBox, makeWrapBox } from './box';

// TODO: review if (!smth) return; checks and replace with errors where needed
class DashboardAlt {
  private dashboardTitle: string;

  private subPoint: null | SubDashboard = null;

  private logLinesStorage: string[] = [];

  private logLinesMaxCount = 500;

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
    DashboardStatic.init(this);

    // initialize subscriber instance
    this.subPoint = new SubDashboard();

    // subscribe to logs, errors, etc
    this.setupSubscribers();

    // setup pubsub messages listener
    this.setupMessagesListener();

    this.initializeBoxes();
    this.configureBoxesCbs();
  }

  private setupSubscribers() {
    if (!this.subPoint) return;

    this.subPoint.subscribeLog();
    this.subPoint.subscribeLogAlt();
    this.subPoint.subscribeErrorExpected();
    this.subPoint.subscribeErrorUnexpected();
  }

  private setupMessagesListener() {
    if (!this.subPoint) return;

    this.subPoint.sub.onByKey('message', (channel, logLevel, message) => {
      switch (channel) {
        case 'dash-log': {
          this.log({
            message: `${message}`,
          });

          break;
        }
        case 'dash-log-alt': {
          this.log({
            message,
          });

          break;
        }
        case 'dash-error-expected': {
          this.log({
            message: handleErrorExpected(<GenericError>message),
          });

          break;
        }
        case 'dash-error-unexpected': {
          this.log({
            message: handleErrorUnexpected(<Error>message),
          });

          break;
        }
        // No default
      }
    });
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
    this.logBox.setItems(this.logLinesStorage);

    if (this.autoScrollLogs) this.logBox.setScrollPerc(100);

    this.logBox.setLabel(`  All Logs  `);
  }

  private log(entity: IAltLogEntity) {
    const logLines = formatStr(entity.message, 128);

    // push log line to object containing logs per id
    this.logLinesStorage.push(...logLines);

    // shift oldest log line if limit exceeded
    if (this.logLinesStorage.length > this.logLinesMaxCount) {
      this.logLinesStorage.shift();
    }
  }

  // *
  // runtime section
}

export { DashboardAlt };
