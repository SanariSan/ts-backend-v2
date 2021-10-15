// import { DashboardMain } from "./core/dashboard";
import { PubSub } from "./events";
import { test } from "./test";

const pubSub = new PubSub();
pubSub.createClient();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function init() {
	// keypubSub === 12345
	const keypubSub = pubSub.onByKey(
		"message",
		(channel, ...args) => {
			console.log(`Message-app.ts ch: ${channel} | args: ${args}`);
		},
		"12345",
	);

	pubSub.subscribe("t");

	test();
}

init();

// async function dashboardInit(logListener) {
// 	const dashboardMain = new DashboardMain();
// 	dashboardMain.init();

// 	logListener.on("log", function (type, data) {
// 		Dashboard.log(type, data);
// 	});

// 	let arr = [{ id: `123` }, { id: `456` }, { id: `789` }];

// 	setInterval(() => {
// 		Dashboard.refresh(arr);
// 	}, 250);
// }

// async function init() {
// dashboardInit(logListener);
// setInterval(() => {
// 	let id = ~~(Math.random() * 3);
// 	logListener.emit("log", {
// 		id: id === 0 ? 123 : id === 1 ? 456 : 789,
// 		string: `Some random char ${String.fromCharCode(~~(Math.random() * 100))}`,
// 	});
// }, 300);
// }
