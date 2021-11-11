interface IAltLogEntity {
  message: string;
}

interface IDashboardAlt {
  dashboardTitle: string;

  appear: (screen) => void;
  disappear: () => void;
  updateContent: () => void;
  show: () => void;
}

export { IDashboardAlt, IAltLogEntity };
