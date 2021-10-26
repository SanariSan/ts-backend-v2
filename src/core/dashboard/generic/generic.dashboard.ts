import { LOG_LEVEL } from "../../../general.type";
import { logAlt } from "../../../helpers/pubsub";
import { TChildInstance } from "./generic.dashboard.type";

class DashboardStorageStatic {
	public static childInstances = Array<TChildInstance>();
	public static currentIdx = 0;
}

class Dashboard {
	protected init(childInstance: TChildInstance) {
		this.persistInstance(childInstance);
		this.appendGlobalHotkeys(childInstance);
	}

	private persistInstance(chI: TChildInstance) {
		DashboardStorageStatic.childInstances.push(chI);
	}

	private appendGlobalHotkeys(chI: TChildInstance) {
		this.appendScreenSwapKeys(chI);
		this.appendExitKeys(chI);
	}

	private appendScreenSwapKeys(chI: TChildInstance) {
		/*
            ORDER : C M S
		    WORK : C-key (ctrl) || M-key (alt) || S-key (shift) || C-S-key (ctrl+shift) || M-S-key (alt+shift)
		    DOESN'T WORK :  C-M-key (ctrl + alt) || C-M-S-key (ctrl+alt+shift)
		    VSCODE : C-key || M-key || S-key (but even these might not work if local shortcut enabled on those keys)
            
            recommended C-key || S-key
		*/

		// shift+left || shift + right for dashboads swap
		chI.screen.key(["S-left", "S-right"], (ch, key) => {
			logAlt(LOG_LEVEL.INFO, `${ch}`);
			logAlt(LOG_LEVEL.INFO, `${JSON.stringify(key)}`);

			const sRef = DashboardStorageStatic;
			sRef.childInstances[sRef.currentIdx].changeCurrent(false);

			// carousel idx change
			if (key.full === "S-left") {
				if (--sRef.currentIdx < 0) sRef.currentIdx = sRef.childInstances.length - 1;
			} else if (key.full === "S-right") {
				if (++sRef.currentIdx >= sRef.childInstances.length) sRef.currentIdx = 0;
			}

			sRef.childInstances[sRef.currentIdx].changeCurrent(true);
		});
	}

	// ctrl+c / escape = destroy screens + exit
	private appendExitKeys(chI: TChildInstance) {
		chI.screen.key(["escape", "C-c"], function (ch, key) {
			for (let instance of DashboardStorageStatic.childInstances) {
				instance.screen.destroy();
			}
			process.exit(0);
		});
	}
}

export { Dashboard };
