import fs from "fs";
import { sendForm, sendLinkParams, sendQueryParams } from "./api-wrappers";
import { CliCheckbox, CliConfirm, CliEmail, CliList, CliNum, CliPass, CliText } from "./core/cli";
import { exampleCLI } from "./core/cli/examples/example";
import { handleError } from "./core/errors";
import blessed from "@xtcry/blessed";
import contrib from "blessed-contrib";
import { EventEmitter } from "stream";

// const { EventEmitter } = require("events");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function closeGracefully(signal) {
	process.exit(0);
}
process.on("SIGINT", closeGracefully);

async function main() {
	const { status: statusForm } = await sendForm().catch((e) => {
		return Promise.reject(e);
	});
	const { status: statusLink } = await sendLinkParams().catch((e) => {
		return Promise.reject(e);
	});
	const { status: statusQuery } = await sendQueryParams().catch((e) => {
		return Promise.reject(e);
	});

	console.log(JSON.stringify({ statusForm, statusLink, statusQuery }, null, 2));

	if (false) return Promise.reject(new Error(""));
	else fs.appendFileSync("./result.json", JSON.stringify({}));

	return true;
}

async function test() {
	var screen = blessed.screen();
	const firstEmitter = new EventEmitter();

	const listeners = {
		logsListenersMap: new Map(),
		otherListenersMap: new Map(),
	};

	//this wrapper lets us access moments right before<->after cb fn call
	const handlerWrap = (fn) => {
		const _handler = (...args) => {
			fn(...args);
		};

		return _handler;
	};

	const setListener = (
		emitter: EventEmitter,
		eventName,
		listenersMap,
		handler, //can remove or save listener (handler) from here
	) => {
		emitter.on(eventName, handler);
		listenersMap.set(eventName, handler); //will do from here
	};

	const clearListeners = (emitter: EventEmitter, listenersMap) => {
		for (let [listenerName, handler] of listenersMap) {
			emitter.off(listenerName, handler);
		}
	};

	function page1(screen) {
		clearListeners(firstEmitter, listeners.logsListenersMap);

		var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });
		var logScr = grid.set(0, 0, 10, 10, contrib.log, {
			label: "Logs",
			bufferLength: 1000,
		});
		var logSwitch = grid.set(0, 10, 10, 2, contrib.log, { label: "Switch" });
		var notifications = grid.set(10, 0, 2, 12, blessed.box, { content: "Notifications" });

		setListener(
			firstEmitter,
			"log",
			listeners.logsListenersMap,
			handlerWrap((str) => logScr.log(str)),
		);

		screen.render();
	}

	function page2(screen) {
		var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });
		//grid.set(row, col, rowSpan, colSpan, obj, opts)
		var questions = grid.set(0, 0, 12, 6, contrib.log, { label: "Questions" });
		var stats = grid.set(0, 6, 12, 6, blessed.box, { content: "Stats" });
		screen.render();
	}

	//no type for carousel ?....
	// @ts-ignore
	var carousel = new contrib.carousel([page1, page2], {
		screen: screen,
		controlKeys: true,
	});

	let i = 0;
	setInterval(function () {
		firstEmitter.emit("log", `${i++} - ${firstEmitter.listenerCount("log")}`);
	}, 150);

	carousel.start();

	screen.key(["escape", "q", "C-c"], function (ch, key) {
		return process.exit(0);
	});
}

async function init() {
	let error = false;

	test();

	// do {
	// 	const cliConfirm = new CliConfirm();
	// 	await cliConfirm.prompt({ key: "key", question: "Ready for the iteration?" });

	// 	// await exampleCLI();

	// 	error = false;
	// 	await main().catch((e) => {
	// 		error = true;
	// 		handleError(e);
	// 	});
	// } while (error);
}

init();
