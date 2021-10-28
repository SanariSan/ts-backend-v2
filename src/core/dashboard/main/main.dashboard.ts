import { SubDashboard } from "../../../events";
import { ObjectAny } from "../../../general.type";
import { GenericError } from "../../errors/generic";
import { handleErrorExpected, handleErrorUnexpected } from "../../errors/handle";
import { Dashboard } from "../generic";
import { makeControlsInfoBox, makeLogBox, makeMenuBox } from "./box";
import { IDashboardMain, IMainLogEntity, IMenuOptions } from "./main.dashboard.type";

class DashboardMain extends Dashboard {
	public dashboardTitle: string;

	private subPoint: null | SubDashboard = null;
	private logLinesStorage: ObjectAny = {};
	private logLinesMaxCount: number = 100;

	private menuBox: any;
	private menuOptions: IMenuOptions;
	private logBox: any;
	private controlsInfoBox: any;

	private boxesSwitch: any[] = [];
	private currentBoxIdx: number = 0;

	constructor() {
		super();

		this.dashboardTitle = "Dashboard-Main";

		// basic menu option explicitly defined here, but later can add way to add new (todo)
		this.menuOptions = ["Logs", "Logs-Alt", "Errors", "Errors-Unexpected"];

		this.init();
	}

	// init configuration section
	// *

	protected init() {
		// init screen if none was before + configure global hotkeys
		super.init(<IDashboardMain>(<unknown>this));

		// initialize subscriber instance
		this.subPoint = new SubDashboard();

		// subscribe to logs, errors, etc
		this.setupSubscribers();

		// setup pubsub messages listener
		this.setupMessagesListener();

		this.initializeBoxes();
		this.configureBoxes(this);
		this.configureBoxesFocusSwap(this);
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

		this.subPoint.sub.onByKey("message", (channel, logLevel, message) => {
			if (channel === "dash-log") {
				this.log({
					optionName: "Logs",
					message: `${message}`,
				});
			} else if (channel === "dash-log-alt") {
				this.log({
					optionName: "Logs-Alt",
					message,
				});
			} else if (channel === "dash-error-expected") {
				this.log({
					optionName: "Errors",
					message: handleErrorExpected(<GenericError>message),
				});
			} else if (channel === "dash-error-unexpected") {
				this.log({
					optionName: "Errors-Unexpected",
					message: handleErrorUnexpected(<Error>message),
				});
			}
		});
	}

	private initializeBoxes() {
		// create predefined screen components = boxes
		this.menuBox = makeMenuBox();
		this.logBox = makeLogBox();
		this.controlsInfoBox = makeControlsInfoBox();

		// store switchable boxes
		this.boxesSwitch = [this.menuBox, this.logBox];
	}

	private allBoxesAssigned(): boolean {
		if (this.menuBox && this.logBox && this.controlsInfoBox) return true;
		return false;
	}

	private configureBoxes(self: this) {
		this.menuBox.focus();
		this.menuBox.on("select item", (item, i) => {
			self.logBox.clearItems();
		});
	}

	// maybe make super.screen.unkey(name, listener) later if problems appear (todo?)
	private configureBoxesFocusSwap(self: this) {
		super.screen.key(["left", "right"], function (ch, key) {
			// remove accent from current box
			self.boxesSwitch[self.currentBoxIdx].style.border.fg = "white";

			// carousel box idx change
			if (key.name === "left") {
				if (--self.currentBoxIdx < 0) self.currentBoxIdx = self.boxesSwitch.length - 1;
			} else if (key.name === "right") {
				if (++self.currentBoxIdx >= self.boxesSwitch.length) self.currentBoxIdx = 0;
			}

			// accent new current box
			self.boxesSwitch[self.currentBoxIdx].focus();
			self.boxesSwitch[self.currentBoxIdx].style.border.fg = "blue";
		});
	}

	// *
	// init configuration section
	// -
	// runtime section
	// *

	public show() {
		super.show(this);
	}

	public appendBoxes(screen) {
		screen.append(this.menuBox);
		screen.append(this.logBox);
		screen.append(this.controlsInfoBox);
	}

	public updateContent() {
		if (!this.allBoxesAssigned()) return;

		this.updateMenuBoxContent();
		this.updateLogsBoxContent();
	}

	private updateMenuBoxContent() {
		if (!this.menuOptions.length) {
			this.menuBox.setItem(0, "No options available");
			return;
		}

		// if there's different amount of options came - clear old ones
		if (this.menuOptions.length != this.menuBox.items.length) {
			this.menuBox.clearItems();
			this.menuBox.setItems(this.menuOptions);
		}
	}

	private updateLogsBoxContent() {
		let selectedMenuOption = this.menuOptions[this.menuBox.selected];
		let logs = this.logLinesStorage[selectedMenuOption];

		if (logs !== undefined) {
			this.logBox.setItems(logs);

			// if box not focused - auto-scroll to the bottom
			if (!this.logBox.focused) {
				this.logBox.setScrollPerc(100);
			}
		}

		this.logBox.setLabel(`  ${selectedMenuOption} Logs  `);
	}

	// todo fix string to fit into box (with \n or smth)
	private log(entity: IMainLogEntity) {
		// clear and initialize logs box as empty array if nothing was logged before
		if (this.logLinesStorage[entity.optionName] === undefined)
			this.logLinesStorage[entity.optionName] = [];

		let logLines = entity.message
			.split("\n")
			.filter((el) => el.length)
			.map((el) => `| ${el}`);
		// .map((el) => `{${gradient(0, [255, 0, 0], [0, 255, 0])}-fg} | ${el}{/}`);

		// push log line to object containing logs per id
		this.logLinesStorage[entity.optionName].push(...logLines);

		// shift oldest log line if limit exceeded
		for (let optionName in this.logLinesStorage) {
			if (this.logLinesStorage[optionName].length > this.logLinesMaxCount) {
				this.logLinesStorage[optionName].shift();
			}
		}
	}

	// *
	// runtime section
}

export { DashboardMain };
