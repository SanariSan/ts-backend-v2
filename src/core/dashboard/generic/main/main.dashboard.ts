import blessed from "blessed";
import { ObjectAny } from "../../../../general.type";
import { Dashboard } from "../generic.dashboard";
import { makeControlsInfoBox, makeLogBox, makeMenuBox } from "./box";

class DashboardMain extends Dashboard {
	private menuBox: blessed.Widgets.ListElement;
	private logBox: blessed.Widgets.ListElement;
	private controlsInfoBox: blessed.Widgets.TextElement;
	private logLinesStorage: ObjectAny;

	constructor() {
		super();
		super.screen.title = "Dashboard-Main";

		this.logLinesStorage = {};

		this.menuBox = makeMenuBox();
		this.logBox = makeLogBox();
		this.controlsInfoBox = makeControlsInfoBox();
	}

	public init() {
		this.menuBox.focus();

		super.screen.append(this.menuBox);
		super.screen.append(this.logBox);
		super.screen.append(this.controlsInfoBox);
	}
}

export { DashboardMain };
