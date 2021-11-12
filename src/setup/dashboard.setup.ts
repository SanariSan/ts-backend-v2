import { DashboardAlt, DashboardMain, DashboardStatic } from '../core/dashboard';

function setupDashboard() {
  const main = new DashboardMain();
  new DashboardAlt();

  DashboardStatic.show(main);
}

export { setupDashboard };
