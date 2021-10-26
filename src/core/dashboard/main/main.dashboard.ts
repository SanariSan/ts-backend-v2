import blessed from "blessed";
import { SubDashboard } from "../../../events";
import { ObjectAny } from "../../../general.type";
import { sleep } from "../../../helpers/util";
import { GenericError } from "../../errors/generic";
import { handleErrorExpected, handleErrorUnexpected } from "../../errors/handle";
import { Dashboard } from "../generic";
import { makeControlsInfoBox, makeLogBox, makeMenuBox } from "./box";
import { IDashboardMain, ILogEntity, IMenuOptions } from "./main.dashboard.type";

class DashboardMain extends Dashboard {
	private logLinesMaxCount: number = 100;
	private refreshRate: number = 1000 / 15; // 1000/fps
	private currentIdx: number = 0;
	private subPoint: SubDashboard;
	private logLinesStorage: ObjectAny;
	private isScreenCurrent: boolean = false; // screen is not yet initialized
	private screen: any;
	private menuBox: any;
	private menuOptions: IMenuOptions;
	private logBox: any;
	private controlsInfoBox: any;
	private boxes: any[] = [];

	private hint: string;

	constructor(hint) {
		super();

		// menu option explicitly defined here, but later can add way to pass new (todo)
		this.menuOptions = ["Logs", "Logs-Alt", "Errors", "Errors-Unexpected", hint];
		this.hint = hint;
		this.logLinesStorage = {};

		// subscribe to logs + errors
		this.subPoint = new SubDashboard();
		this.subPoint.subscribeLog();
		this.subPoint.subscribeLogAlt();
		this.subPoint.subscribeErrorExpected();
		this.subPoint.subscribeErrorUnexpected();

		// setup pubsub messages listener i.e. class methods entry point
		this.setupMessagesListener();
	}

	private setupMessagesListener() {
		this.subPoint.sub.onByKey("message", (channel, logLevel, message) => {
			if (channel === "dash-log") {
				this.log({
					optionName: "Logs",
					message: `${this.hint} ${message}`,
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

	public init() {
		this.screen = blessed.screen({
			smartCSR: true,
			fullUnicode: true,
		});
		this.screen.title = "Dashboard-Main";

		// make global setup based on this instance, must be called after screen assigned
		super.init(<IDashboardMain>(<unknown>this));

		this.createBoxes();
		this.configureBoxes(this);
		this.configureBoxesFocusSwap(this);
		this.configureScreenControls(this);
		this.appendBoxes();

		// store components like this to switch between them
		this.boxes = [this.menuBox, this.logBox];

		// screen is ready to be rerendered
		this.isScreenCurrent = true;
		this.refreshScreen();
	}

	public changeCurrent(status: boolean) {
		this.isScreenCurrent = status;
		if (this.isScreenCurrent) this.refreshScreen();
	}

	// public destroy() {
	// 	// any actions to do when destroying screen before swapping
	// 	this.isScreenCurrent = false;
	// 	this.screen.destroy();
	// }

	private createBoxes() {
		// create predefined screen components
		this.menuBox = makeMenuBox();
		this.logBox = makeLogBox();
		this.controlsInfoBox = makeControlsInfoBox();
	}

	private configureBoxes(_this: this) {
		this.menuBox.focus();
		this.menuBox.on("select item", (item, i) => {
			_this.logBox.clearItems();
		});
	}

	private configureBoxesFocusSwap(_this: this) {
		this.screen.key(["left", "right"], function (ch, key) {
			// remove accent from current box
			_this.boxes[_this.currentIdx].style.border.fg = "white";

			// carousel box idx change
			if (key.name === "left") {
				if (--_this.currentIdx < 0) _this.currentIdx = _this.boxes.length - 1;
			} else if (key.name === "right") {
				if (++_this.currentIdx >= _this.boxes.length) _this.currentIdx = 0;
			}

			// accent new current box
			_this.boxes[_this.currentIdx].focus();
			_this.boxes[_this.currentIdx].style.border.fg = "blue";
		});
	}

	private configureScreenControls(_this: this) {
		// ctrl+u = destroy screen
		// this.screen.key(["C-u"], function (ch, key) {
		// 	_this.screen.destroy();
		// });
	}

	private appendBoxes() {
		this.screen.append(this.menuBox);
		this.screen.append(this.logBox);
		this.screen.append(this.controlsInfoBox);
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

	private async refreshScreen() {
		if (!this.isScreenCurrent) {
			return;
		}

		this.updateMenuBoxContent();
		this.updateLogsBoxContent();
		this.screen.render();

		await sleep(this.refreshRate);
		this.refreshScreen();
	}

	// todo fix string to fit into box (with \n or smth)
	private log(entity: ILogEntity) {
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
}

export { DashboardMain };
