import fs from "fs";
import { sendForm, sendLinkParams, sendQueryParams } from "./api-wrappers";
import { CliCheckbox, CliConfirm, CliEmail, CliList, CliNum, CliPass, CliText } from "./core/cli";
import { exampleCLI } from "./core/cli/examples/example";
import { handleError } from "./core/errors";

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

async function init() {
	let error = false;

	do {
		const cliConfirm = new CliConfirm();
		await cliConfirm.prompt({ key: "key", question: "Ready for the iteration?" });

		// await exampleCLI();

		error = false;
		await main().catch((e) => {
			error = true;
			handleError(e);
		});
	} while (error);
}

init();
