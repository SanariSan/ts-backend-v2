import blessed from "blessed";

class Dashboard {
	protected screen: blessed.Widgets.Screen;
	constructor() {
		this.screen = blessed.screen({
			smartCSR: true,
			fullUnicode: true,
		});
	}
}

//init
function initialuze() {
	// Init Screen

	this.menuBox.on("select item", (item, i) => {
		this.logBox.clearItems();
	});

	// this.questionsBox = blessed.text({
	// 	content: " Use Ctrl+u to switch to questions control screen ",
	// 	left: "0%",
	// 	top: "76%",
	// 	width: "100%",
	// 	height: "24%",
	// 	valign: "middle",
	// 	tags: true,
	// 	style: {
	// 		fg: "white",
	// 	},
	// });

	// this.screen.append(this.questionsBox);

	this.menuBox.setLabel(" Menu ");

	this.screen.render();

	let that = this;

	let i = 0;
	let boards = ["menuBox", "logBox"];
	this.screen.key(["left", "right"], function (ch, key) {
		key.name === "left" ? i-- : i++;
		if (i == 2) i = 0;
		if (i == -1) i = 1;
		that[boards[i]].focus();
		that[boards[i]].style.border.fg = "blue";
		if (key.name === "left") {
			if (i == 1) that[boards[0]].style.border.fg = "white";
			else that[boards[i + 1]].style.border.fg = "white";
		} else {
			if (i == 0) that[boards[1]].style.border.fg = "white";
			else that[boards[i - 1]].style.border.fg = "white";
		}
	});

	this.screen.key(["escape", "q", "C-c"], function (ch, key) {
		this.screen.destroy();
		process.exit(0);
	});

	this.screen.key(["C-u"], function (ch, key) {
		this.screen.destroy();
	});

	// async refresh of the ui
	setInterval(function () {
		that.screen.render();
	}, 300);

	return this;
}

function refresh(menuOptions) {
	if (!menuOptions) {
		this.menuBox.setItem(0, "No options available");
		return;
	}

	// if there's different amount of options came - clear old ones
	if (menuOptions.length != this.menuBox.items.length) {
		this.menuBox.clearItems();
	}

	for (let i = 0; i < menuOptions.length; i++) {
		let menuOption = `ID: ${menuOptions[i].id}`;

		// if option exists - set new on it's place, otherwise just push (or else throw happens)
		if (this.menuBox.getItem(i)) {
			this.menuBox.setItem(i, menuOption);
		} else {
			this.menuBox.pushItem(menuOption);
		}
	}

	let selectedMenuOption = menuOptions[this.menuBox.selected];
	let logs = this.logLinesStorage[selectedMenuOption.id];

	if (logs !== undefined) {
		this.logBox.setItems(logs);

		// if box not focused - auto-scroll to the bottom
		if (!this.logBox.focused) {
			this.logBox.setScrollPerc(100);
		}
	}

	this.logBox.setLabel(`  ${selectedMenuOption.id} Logs  `);
	this.screen.render();

	return this;
}

function log(data) {
	// clear and initialize logs box as empty array if nothing was logged before
	if (this.logLinesStorage[data.id] === undefined) {
		this.logLinesStorage[data.id] = [];
	}

	let string = `{${gradient(Math.random() * 100, [255, 0, 0], [0, 255, 0])}-fg} > ${
		data.string
	}{/}`;

	// push log line to object containing logs per id
	this.logLinesStorage[data.id].push(string);

	// shift oldest log line if limit exceeded
	let maxCount = 200;
	for (let id in this.logLinesStorage) {
		if (this.logLinesStorage[id].length > maxCount) this.logLinesStorage[id].shift();
	}

	return this;
}

export { Dashboard };

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
