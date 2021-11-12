interface IAltLogEntity {
  message: string;
}

interface IDashboardAlt {
  appear: (screen) => void;
  disappear: () => void;
  updateContent: () => void;
}

export { IDashboardAlt, IAltLogEntity };
