interface IWidgetMain {
  appear: (screen) => void;
  disappear: () => void;
  updateContent: () => void;
}

export type { IWidgetMain };
