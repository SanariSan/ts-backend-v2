import { TChildInstance } from "./generic.dashboard.type";

class DashboardStorageStatic {
	public static childInstances = Array<TChildInstance>();
	public static currentIdx = 0;
}

class Dashboard {
	protected persistInstance(childInstance: TChildInstance) {
		DashboardStorageStatic.childInstances.push(childInstance);
	}

	protected appendGlobalHotkeys(childInstance: TChildInstance) {
		this.appendScreenSwapKeys(childInstance);
		this.appendExitKeys(childInstance);
	}

	// ctrl+shift+arrows = switch screens
	private appendScreenSwapKeys(chI: TChildInstance) {
		chI.screen.key(["C-S-left", "C-S-right"], (ch, key) => {
			const sRef = DashboardStorageStatic;
			sRef.childInstances[sRef.currentIdx].destroy();

			// carousel idx change
			if (key.name === "C-S-left") {
				if (--sRef.currentIdx < 0) sRef.currentIdx = sRef.childInstances.length;
			} else if (key.name === "C-S-right") {
				if (++sRef.currentIdx >= sRef.childInstances.length) sRef.currentIdx = 0;
			}

			sRef.childInstances[sRef.currentIdx].init();
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
