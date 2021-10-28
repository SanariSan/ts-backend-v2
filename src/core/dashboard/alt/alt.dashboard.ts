import { SubDashboard } from "../../../events";
import { GenericError } from "../../errors/generic";
import { handleErrorExpected, handleErrorUnexpected } from "../../errors/handle";
import { Dashboard } from "../generic";
import { makeLogBox } from "./box";
import { IDashboardAlt, IAltLogEntity } from "./alt.dashboard.type";

class DashboardAlt extends Dashboard {
	public dashboardTitle: string;

	private subPoint: null | SubDashboard = null;
	private logLinesStorage: Array<string> = [];
	private logLinesMaxCount: number = 500;

	private logBox: any;

	constructor() {
		super();

		this.dashboardTitle = "Dashboard-Alt";

		this.init();
	}

	// init configuration section
	// *

	protected init() {
		// init screen if none was before + configure global hotkeys
		super.init(<IDashboardAlt>(<unknown>this));

		// initialize subscriber instance
		this.subPoint = new SubDashboard();

		// subscribe to logs, errors, etc
		this.setupSubscribers();

		// setup pubsub messages listener
		this.setupMessagesListener();

		this.initializeBoxes();
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
					message: `${message}`,
				});
			} else if (channel === "dash-log-alt") {
				this.log({
					message,
				});
			} else if (channel === "dash-error-expected") {
				this.log({
					message: handleErrorExpected(<GenericError>message),
				});
			} else if (channel === "dash-error-unexpected") {
				this.log({
					message: handleErrorUnexpected(<Error>message),
				});
			}
		});
	}

	private initializeBoxes() {
		// create predefined screen components = boxes
		this.logBox = makeLogBox();
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

	public show() {
		super.show(this);
	}

	public appendBoxes(screen) {
		screen.append(this.logBox);
	}

	public updateContent() {
		if (!this.allBoxesAssigned()) return;

		this.updateLogsBoxContent();
	}

	private updateLogsBoxContent() {
		this.logBox.setItems(this.logLinesStorage);

		// if box not focused - auto-scroll to the bottom
		// if (!this.logBox.focused) {
		this.logBox.setScrollPerc(100);
		// }

		this.logBox.setLabel(`  All Logs  `);
	}

	// todo fix string to fit into box (with \n or smth)
	private log(entity: IAltLogEntity) {
		let logLines = entity.message
			.split("\n")
			.filter((el) => el.length)
			.map((el) => `| ${el}`);
		// .map((el) => `{${gradient(0, [255, 0, 0], [0, 255, 0])}-fg} | ${el}{/}`);

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
