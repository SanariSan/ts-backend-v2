import type { IDashboardAlt } from '../../alt';
import type { IDashboardMain } from '../../main';

type TDashboardInstance = IDashboardMain | IDashboardAlt; // | etc

export type { TDashboardInstance };
