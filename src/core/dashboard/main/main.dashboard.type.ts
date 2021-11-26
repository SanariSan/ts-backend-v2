interface IDashboardMain {
  appear: (screen) => void;
  disappear: () => void;
  updateContent: () => void;
}

export type { IDashboardMain };
