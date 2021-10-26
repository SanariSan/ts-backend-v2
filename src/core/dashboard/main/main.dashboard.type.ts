import { Widgets } from "blessed";
import { ObjectAny } from "../../../general.type";

type IMenuOption = "Logs" | "Logs-Alt" | "Errors" | "Errors-Unexpected";
type IMenuOptions = Array<Required<IMenuOption>>;

interface ILogEntity {
	optionName: IMenuOption;
	message: string;
}

interface IDashboardMain {
	screen: Widgets.Screen;
	menuBox: Widgets.ListElement;
	logBox: Widgets.ListElement;
	controlsInfoBox: Widgets.TextElement;
	menuOptions: IMenuOptions;
	logLinesStorage: ObjectAny;
	logLinesMaxCount: number;
	refreshRate: number;

	init: () => void;
	changeCurrent: (status: boolean) => void;
	setupBoxes: () => void;
	setupBoxesFocusSwap: (_this: IDashboardMain) => void;
	setupScreenControls: () => void;
	appendBoxes: () => void;
	updateMenuBoxContent: () => void;
	updateLogsBoxContent: () => void;
	refreshScreen: () => void;
	log: (entity: ILogEntity) => void;
}

export { IDashboardMain, ILogEntity, IMenuOptions };
