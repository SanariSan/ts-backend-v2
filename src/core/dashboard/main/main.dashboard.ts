import type { IMainLogEntity, IMenuOptions } from './main.dashboard.type';
import type { ObjectAny } from '../../../general.type';
import { formatStr } from '../../../helpers/dashboard';
import { handleErrorExpected, handleErrorUnexpected } from '../../errors/handle';
import { SubDashboard } from '../../events';
import { DashboardStatic } from '../static';
import { makeControlsInfoBox, makeLogBox, makeMenuBox, makeWrapBox } from './box';
import type { GenericError } from '../../errors/generic';

// TODO: review if (!smth) return; checks and replace with errors where needed
class DashboardMain {
  private readonly dashboardTitle: string;

  private subPoint: null | SubDashboard = null;

  private logLinesStorage: ObjectAny = {};

  private readonly logLinesMaxCount = 100;

  private wrapBox: any;

  private wrapBoxCb: any;

  private menuBox: any;

  private menuBoxCb: any;

  private readonly menuOptions: IMenuOptions;

  private logBox: any;

  private logBoxCb: any;

  private controlsInfoBox: any;

  private autoScrollLogs = true;

  private boxesSwitch: any[] = [];

  private currentBoxIdx = 0;

  constructor() {
    this.dashboardTitle = 'Dashboard-Main';

    // TODO: basic menu option explicitly defined here, but later can add way to add new
    this.menuOptions = ['Logs-Main', 'Logs-Alt', 'Errors', 'Errors-Unexpected'];

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
            optionName: 'Logs-Main',
            message: `${message}`,
          });

          break;
        }
        case 'dash-log-alt': {
          this.log({
            optionName: 'Logs-Alt',
            message,
          });

          break;
        }
        case 'dash-error-expected': {
          this.log({
            optionName: 'Errors',
            message: handleErrorExpected(<GenericError>message),
          });

          break;
        }
        case 'dash-error-unexpected': {
          this.log({
            optionName: 'Errors-Unexpected',
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
    if (this.menuOptions.length === 0) {
      this.menuBox.setItem(0, 'No options available');
      return;
    }

    // if there's different amount of options came - clear old ones
    if (this.menuOptions.length != this.menuBox.items.length) {
      this.menuBox.clearItems();
      this.menuBox.setItems(this.menuOptions);
    }
  }

  private updateLogsBoxContent() {
    const selectedMenuOption = this.menuOptions[this.menuBox.selected];
    const logs = this.logLinesStorage[selectedMenuOption];

    if (logs !== undefined) {
      this.logBox.setItems(logs);

      if (this.autoScrollLogs) {
        this.logBox.setScrollPerc(100);
      }
    }

    this.logBox.setLabel(`  ${selectedMenuOption} Logs  `);
  }

  private log(entity: IMainLogEntity) {
    // clear and initialize logs box as empty array if nothing was logged before
    if (this.logLinesStorage[entity.optionName] === undefined)
      this.logLinesStorage[entity.optionName] = [];

    const logLines = formatStr(entity.message, 87);

    // push log line to object containing logs per id
    this.logLinesStorage[entity.optionName].push(...logLines);

    // shift oldest log line if limit exceeded
    for (const optionName in this.logLinesStorage) {
      if (this.logLinesStorage[optionName].length > this.logLinesMaxCount) {
        this.logLinesStorage[optionName].shift();
      }
    }
  }

  // *
  // runtime section
}

export { DashboardMain };
