import { DashboardAlt, DashboardMain } from '../core/dashboard';

function setupDashboard() {
  const mainDB = new DashboardMain();
  new DashboardAlt();

  mainDB.show();
}

export { setupDashboard };
