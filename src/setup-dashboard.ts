import { DashboardMain } from "./core/dashboard";

function setupDashboard() {
	const dashboardMain = new DashboardMain("1a");
	const dashboardMain1 = new DashboardMain("2a"); // just to test swaps, remove later
	// const dashboardAlt = new DashboardAlt();

	// and then call init on dashboard you want to show up first
	dashboardMain.init();
}

export { setupDashboard };
