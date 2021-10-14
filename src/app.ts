// import { DashboardMain } from "./core/dashboard";
import { PubSub } from "./events";
import { test } from "./test";

const pubSub = new PubSub();
const pubSub1 = new PubSub();
pubSub.createClient();
pubSub1.createClient();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function init() {
	pubSub.on("message", (channel, ...args) => {
		console.log(`Message ch: ${channel} | args: ${args}`);
	});
	pubSub1.on("message", (channel, ...args) => {
		console.log(`Message-1 ch: ${channel} | args: ${args}`);
	});

	pubSub.subscribe("testChannel");
	pubSub.subscribe("2nd");

	pubSub1.subscribe("2nd");

	test();
}

setTimeout(() => {
	pubSub.quit();
}, 3000);

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
