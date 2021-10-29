import { DashboardAlt, DashboardMain } from "../core/dashboard";

function setupDashboard() {
	new DashboardMain().show();
	new DashboardAlt();
}

export { setupDashboard };
