import blessed from "blessed";
import { LOG_LEVEL } from "../../../general.type";
import { logAlt } from "../../../helpers/pubsub";
import { sleep } from "../../../helpers/util";
import { TChildInstance } from "./generic.dashboard.type";

class DashboardStatic {
	public static screen: any = null;
	public static childInstances = Array<TChildInstance>();
	public static currChildIdx = 0;
	public static refreshRate: number = 1000 / 30; // 1000/fps

	public static async refreshScreen() {
		this.childInstances[this.currChildIdx].updateContent();
		this.screen.render();

		await sleep(this.refreshRate);
		this.refreshScreen();
	}
}

class Dashboard {
	get screen() {
		return DashboardStatic.screen;
	}
	set screen(value) {
		DashboardStatic.screen = value;
	}
	get childInstances() {
		return DashboardStatic.childInstances;
	}
	get refreshRate() {
		return DashboardStatic.refreshRate;
	}
	get currChildIdx() {
		return DashboardStatic.currChildIdx;
	}
	set currChildIdx(value: number) {
		DashboardStatic.currChildIdx = value;
	}

	protected init(childInstance: TChildInstance) {
		// save child instance
		this.childInstances.push(childInstance);

		if (this.screen === null) {
			this.screen = blessed.screen({
				smartCSR: true,
				fullUnicode: true,
			});
			this.configureGlobalHotkeys();
			this.screen.title = childInstance.dashboardTitle;

			DashboardStatic.refreshScreen();
		}
	}

	public show(childInstance: TChildInstance) {
		this.detachBoxes();
		childInstance.appendBoxes(this.screen);
	}

	private detachBoxes() {
		// detach children boxes
		let i = this.screen.children.length;
		while (i--) this.screen.children[i].detach();
	}

	private configureGlobalHotkeys() {
		this.configureScreenSwapKeys(this);
		this.configureExitKeys(this);
	}

	/*
        ORDER : C M S
	    WORK : C-key (ctrl) || M-key (alt) || S-key (shift) || C-S-key (ctrl+shift) || M-S-key (alt+shift)
		DOESN'T WORK :  C-M-key (ctrl + alt) || C-M-S-key (ctrl+alt+shift)
		VSCODE : C-key || M-key || S-key (but even these might not work if local shortcut enabled on those keys)
        
        recommended C-key || S-key
        
        shift+lef/right for dashboads swap
    */
	private configureScreenSwapKeys(self: this) {
		this.screen.key(["S-left", "S-right"], (ch, key) => {
			// temp
			logAlt(LOG_LEVEL.INFO, `${JSON.stringify(key)}`);

			self.detachBoxes();

			// carousel idx change
			if (key.full === "S-left") {
				if (--self.currChildIdx < 0) self.currChildIdx = self.childInstances.length - 1;
			} else if (key.full === "S-right") {
				if (++self.currChildIdx >= self.childInstances.length) self.currChildIdx = 0;
			}

			// attach next children configured boxes
			const currChild = self.childInstances[self.currChildIdx];
			currChild.appendBoxes(self.screen);
			self.screen.title = currChild.dashboardTitle;
		});
	}

	// ctrl+c / escape = destroy screens + exit
	private configureExitKeys(self: this) {
		this.screen.key(["escape", "C-c", "q"], function (ch, key) {
			self.screen.destroy();
			process.exit(0);
		});
	}
}

export { Dashboard };
