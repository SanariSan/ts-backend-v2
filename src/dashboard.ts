import blessed from "blessed";

let Dashboard: any = {};

let DEFAULT_PADDING = {
	top: 0,
	left: 1,
	right: 1,
};

let WIDTH_LEFT_PANEL = 30;

Dashboard.init = function () {
	// Init Screen
	this.screen = blessed.screen({
		smartCSR: true,
		fullUnicode: true,
	});
	this.screen.title = "Dashboard";

	this.logLinesStorage = {};

	this.menuBox = blessed.list({
		top: "0",
		left: "0",
		width: WIDTH_LEFT_PANEL + "%",
		height: "70%",
		padding: 0,
		scrollbar: {
			ch: " ",
			inverse: false,
		},
		border: {
			type: "line",
		},
		keys: true,
		autoCommandKeys: true,
		tags: true,
		style: {
			selected: {
				bg: "blue",
				fg: "white",
			},
			scrollbar: {
				bg: "blue",
				fg: "black",
			},
			fg: "white",
			border: {
				fg: "blue",
			},
			header: {
				fg: "blue",
			},
		},
	});

	this.menuBox.on("select item", (item, i) => {
		this.logBox.clearItems();
	});

	this.logBox = blessed.list({
		label: " Logs ",
		top: "0",
		left: WIDTH_LEFT_PANEL + "%",
		width: 100 - WIDTH_LEFT_PANEL + "%",
		height: "70%",
		padding: DEFAULT_PADDING,
		scrollable: true,
		scrollbar: {
			ch: " ",
			inverse: false,
		},
		keys: true,
		autoCommandKeys: true,
		tags: true,
		border: {
			type: "line",
		},
		style: {
			fg: "white",
			border: {
				fg: "white",
			},
			scrollbar: {
				bg: "blue",
				fg: "black",
			},
		},
	});

	this.infoBox = blessed.text({
		content:
			" left/right: switch boards | up/down/mouse: scroll | Ctrl-C: exit{|} {cyan-fg}{bold}This WORKS!!!{/}  ",
		left: "0%",
		top: "95%",
		width: "100%",
		height: "6%",
		valign: "middle",
		tags: true,
		style: {
			fg: "white",
		},
	});

	this.menuBox.focus();

	this.screen.append(this.menuBox);
	this.screen.append(this.logBox);
	this.screen.append(this.infoBox);

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

	// async refresh of the ui
	setInterval(function () {
		that.screen.render();
	}, 300);

	return this;
};

Dashboard.refresh = function (menuOptions) {
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
};

Dashboard.log = function (data) {
	// clear and initialize logs box as empty array if nothing was logged before
	if (this.logLinesStorage[data.id] === undefined) {
		this.logLinesStorage[data.id] = [];
	}

	// push log line to object containing logs per id
	this.logLinesStorage[data.id].push(data.id + "{/} > " + data.string);

	// shift oldest log line if limit exceeded
	let maxCount = 200;
	for (let id in this.logLinesStorage) {
		if (this.logLinesStorage[id].length > maxCount) this.logLinesStorage[id].shift();
	}

	return this;
};

export { Dashboard };
