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

export { Dashboard };
