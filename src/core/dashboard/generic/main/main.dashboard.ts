import blessed from "blessed";
import { ObjectAny } from "../../../../general.type";
import { sleep } from "../../../../helpers/util";
import { Dashboard } from "../generic.dashboard";
import { makeControlsInfoBox, makeLogBox, makeMenuBox } from "./box";

class DashboardMain extends Dashboard {
	private menuBox: blessed.Widgets.ListElement;
	private logBox: blessed.Widgets.ListElement;
	private controlsInfoBox: blessed.Widgets.TextElement;
	private menuOptions: Array<string> = ["test1", "test2", "test3"];
	private logLinesStorage: ObjectAny;
	private logLinesMaxCount: number = 100;
	private refreshRate: number = 1000 / 30; // 1000/fps

	constructor() {
		super();
		this.screen.title = "Dashboard-Main";

		this.logLinesStorage = {};

		this.menuBox = makeMenuBox();
		this.logBox = makeLogBox();
		this.controlsInfoBox = makeControlsInfoBox();
	}

	public init() {
		this.setupBoxes();
		this.setupBoxesFocusSwap(this);
		this.setupScreenControls();
		this.appendBoxes();
		this.refreshScreen();
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

		// ctrl+c / q / esc = destroy screen + exit
		this.screen.key(["escape", "q", "C-c"], function (ch, key) {
			this.screen.destroy();
			process.exit(0);
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

	public log(entity) {
		// clear and initialize logs box as empty array if nothing was logged before
		this.logLinesStorage[entity.optionName] ??= [];

		let logLine = `{${gradient(Math.random() * 100, [255, 0, 0], [0, 255, 0])}-fg} > ${
			entity.message
		}{/}`;

		// push log line to object containing logs per id
		this.logLinesStorage[entity.optionName].push(logLine);

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
