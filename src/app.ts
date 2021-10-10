import { EventEmitter } from "stream";
import { Dashboard } from "./dashboard";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function dashboardInit(logListener) {
	Dashboard.init();

	logListener.on("log", function (type, data) {
		Dashboard.log(type, data);
	});

	let arr = [{ id: `123` }, { id: `456` }, { id: `789` }];

	setInterval(() => {
		Dashboard.refresh(arr);
	}, 250);
}

async function init() {
	let logListener = new EventEmitter();

	dashboardInit(logListener);

	setInterval(() => {
		let id = ~~(Math.random() * 3);
		logListener.emit("log", {
			id: id === 0 ? 123 : id === 1 ? 456 : 789,
			string: `Some random char ${String.fromCharCode(~~(Math.random() * 100))}`,
		});
	}, 300);
}

init();
