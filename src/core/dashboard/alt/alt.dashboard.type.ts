interface IAltLogEntity {
	message: string;
}

interface IDashboardAlt {
	dashboardTitle: string;

	appendBoxes: (screen) => void;
	updateContent: () => void;
	show: () => void;
}

export { IDashboardAlt, IAltLogEntity };
