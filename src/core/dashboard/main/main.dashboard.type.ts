type IMenuOption = "Logs-Main" | "Logs-Alt" | "Errors" | "Errors-Unexpected";
type IMenuOptions = Array<Required<IMenuOption>>;

interface IMainLogEntity {
	optionName: IMenuOption;
	message: string;
}

interface IDashboardMain {
	dashboardTitle: string;

	appendBoxes: (screen) => void;
	updateContent: () => void;
	show: () => void;
}

export { IDashboardMain, IMainLogEntity, IMenuOptions };
