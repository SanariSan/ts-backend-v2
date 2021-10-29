import { formatStr } from "../../../helpers/dashboard";
import { GenericError } from "../../errors/generic";
import { handleErrorExpected, handleErrorUnexpected } from "../../errors/handle";
import { SubDashboard } from "../../events";
import { Dashboard } from "../generic";
import { IAltLogEntity, IDashboardAlt } from "./alt.dashboard.type";
import { makeControlsInfoBox, makeLogBox } from "./box";

class DashboardAlt extends Dashboard {
	public dashboardTitle: string;

	private subPoint: null | SubDashboard = null;
	private logLinesStorage: Array<string> = [];
	private logLinesMaxCount: number = 500;
	private autoScrollLogs: boolean = true;

	private logBox: any;
	private controlsInfoBox: any;

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
		this.configureBoxes(this);
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
		this.controlsInfoBox = makeControlsInfoBox();
	}

	private configureBoxes(self: this) {
		this.logBox.key("s", (ch, key) => {
			self.autoScrollLogs = !self.autoScrollLogs;
		});
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
		screen.append(this.controlsInfoBox);
	}

	public updateContent() {
		if (!this.allBoxesAssigned()) return;

		this.updateLogsBoxContent();
	}

	private updateLogsBoxContent() {
		this.logBox.setItems(this.logLinesStorage);

		if (this.autoScrollLogs) this.logBox.setScrollPerc(100);

		this.logBox.setLabel(`  All Logs  `);
	}

	private log(entity: IAltLogEntity) {
		let logLines = formatStr(entity.message, 128);

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
