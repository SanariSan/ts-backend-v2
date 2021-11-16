type IMenuOption = 'Logs-Main' | 'Logs-Alt' | 'Errors' | 'Errors-Unexpected';
type IMenuOptions = Array<Required<IMenuOption>>;

interface IMainLogEntity {
  optionName: IMenuOption;
  message: string;
}

interface IDashboardMain {
  appear: (screen) => void;
  disappear: () => void;
  updateContent: () => void;
}

export type { IDashboardMain, IMainLogEntity, IMenuOptions };
