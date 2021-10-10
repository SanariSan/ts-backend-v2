import { CliBase } from "../cli-prompt-base";
import { IConfirmPrompt } from "./cli-prompt-confirm.type";

class CliConfirm extends CliBase {
	constructor() {
		super("confirm");
	}

	//result value either true or false
	public prompt({ key, question, ...rest }: IConfirmPrompt): Promise<any> {
		return super.prompt({ key, question, ...rest });
	}
}

export { CliConfirm };
