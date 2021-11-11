type IMenuOption = 'Logs-Main' | 'Logs-Alt' | 'Errors' | 'Errors-Unexpected';
type IMenuOptions = Array<Required<IMenuOption>>;

interface IMainLogEntity {
  optionName: IMenuOption;
  message: string;
}

interface IDashboardMain {
  dashboardTitle: string;

  appear: (screen) => void;
  disappear: () => void;
  updateContent: () => void;
  show: () => void;
}

export { IDashboardMain, IMainLogEntity, IMenuOptions };
