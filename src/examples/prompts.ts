import { Separator } from "inquirer";
import {
	CliPromptCheckbox,
	CliPromptConfirm,
	CliPromptEmail,
	CliPromptList,
	CliPromptNum,
	CliPromptPass,
	CliPromptText,
} from "../core/cli-prompt";

async function prompts() {
	let cliText = new CliPromptText();
	let cliConfirm = new CliPromptConfirm();
	let cliNum = new CliPromptNum();
	let cliPass = new CliPromptPass();
	let cliEmail = new CliPromptEmail();
	let cliList = new CliPromptList();
	let cliCheckbox = new CliPromptCheckbox();

	// if key not passed random generated
	let keyText = await cliText.prompt({ question: "Text prompt" });
	let keyConfirm = await cliConfirm.prompt({ key: "confirm", question: "Confirm prompt" });
	let keyNum = await cliNum.prompt({ key: "number", question: "Number prompt" });
	let keyPass = await cliPass.prompt({ key: "pass", question: "Password prompt" });
	let keyEmail = await cliEmail.prompt({ key: "email", question: "Email prompt" });
	let keyList = await cliList.prompt({
		key: "list",
		question: "List prompt",
		choices: [
			new Separator(),
			"first",
			"second",
			new Separator(" = Custom separator = "),
			"third",
			{ name: "fourth", disabled: "Unavailable now" },
		],
	});
	let keyCheckbox = await cliCheckbox.prompt({
		key: "checkbox",
		question: "Checkbox prompt",
		choices: [
			new Separator(),
			"first",
			{ name: "second", checked: true },
			new Separator(" = Custom separator = "),
			"third",
			{ name: "fourth", disabled: "Unavailable now" },
		],
	});

	console.log(cliText.getValue(keyText));
	console.log(cliConfirm.getValue(keyConfirm));
	console.log(cliNum.getValue(keyNum));
	console.log(cliPass.getValue(keyPass));
	console.log(cliEmail.getValue(keyEmail));
	console.log(cliList.getValue(keyList));
	console.log(cliCheckbox.getValue(keyCheckbox));
}

prompts();
