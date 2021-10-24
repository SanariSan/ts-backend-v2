import blessed, { Widgets } from "blessed";
import { ObjectAny } from "../../../../general.type";
import { sleep } from "../../../../helpers/util";
import { Dashboard } from "../generic.dashboard";
import { makeControlsInfoBox, makeLogBox, makeMenuBox } from "./box";
import { IDashboardMain, ILogEntity, IMenuOptions } from "./main.dashboard.type";

class DashboardMain extends Dashboard {
	private screen: Widgets.Screen;
	private menuBox: Widgets.ListElement;
	private logBox: Widgets.ListElement;
	private controlsInfoBox: Widgets.TextElement;
	private boxes;
	private menuOptions: IMenuOptions;
	private logLinesStorage: ObjectAny;
	private logLinesMaxCount: number = 100;
	private refreshRate: number = 1000 / 30; // 1000/fps

	constructor() {
		super();

		this.menuOptions = ["Logs", "Logs-Alt", "Errors", "Errors-Unexpected"];

		this.logLinesStorage = {};

		this.menuBox = makeMenuBox();
		this.logBox = makeLogBox();
		this.controlsInfoBox = makeControlsInfoBox();
		this.boxes = [this.menuBox, this.logBox, this.controlsInfoBox];

		// subscribe to logs + errors HERE!
	}

	public init() {
		this.screen = blessed.screen({
			smartCSR: true,
			fullUnicode: true,
		});
		this.screen.title = "Dashboard-Main";

		super.persistInstance(<IDashboardMain>(<unknown>this));
		super.appendGlobalHotkeys(<IDashboardMain>(<unknown>this));

		this.setupBoxes();
		this.setupBoxesFocusSwap(this);
		this.setupScreenControls();
		this.appendBoxes();
		this.refreshScreen();
	}

	public destroy() {
		// any actions to do when destroying screen before swapping
		this.screen.destroy();
	}

	private setupBoxes() {
		this.menuBox.setLabel(" Menu ");
		this.menuBox.focus();
		this.menuBox.on("select item", (item, i) => {
			this.logBox.clearItems();
		});
	}

	private setupBoxesFocusSwap(_this) {
		let i = 0;
		let boards = ["menuBox", "logBox"];
		this.screen.key(["left", "right"], function (ch, key) {
			key.name === "left" ? i-- : i++;
			if (i == 2) i = 0;
			if (i == -1) i = 1;
			_this[boards[i]].focus();
			_this[boards[i]].style.border.fg = "blue";
			if (key.name === "left") {
				if (i == 1) _this[boards[0]].style.border.fg = "white";
				else _this[boards[i + 1]].style.border.fg = "white";
			} else {
				if (i == 0) _this[boards[1]].style.border.fg = "white";
				else _this[boards[i - 1]].style.border.fg = "white";
			}
		});
	}

	private setupScreenControls() {
		// ctrl+u = destroy screen
		this.screen.key(["C-u"], function (ch, key) {
			this.screen.destroy();
		});
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
		if (true) {
			this.screen.render();
		}

		this.updateMenuBoxContent();
		this.updateLogsBoxContent();

		await sleep(this.refreshRate);
		this.refreshScreen();
	}

	public log(entity: ILogEntity) {
		// clear and initialize logs box as empty array if nothing was logged before
		this.logLinesStorage[entity.optionName] ??= [];

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

function gradient(p: number, rgb_beginning: number[], rgb_end: number[]) {
	let w = (p / 100) * 2 - 1;

	let w1 = (w + 1) / 2.0;
	let w2 = 1 - w1;

	let rgb = [
		Math.floor(rgb_beginning[0] * w1 + rgb_end[0] * w2),
		Math.floor(rgb_beginning[1] * w1 + rgb_end[1] * w2),
		Math.floor(rgb_beginning[2] * w1 + rgb_end[2] * w2),
	];

	return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

export { DashboardMain };
