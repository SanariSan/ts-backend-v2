import { CliBase } from "../cli-base";
import { IConfirmPrompt } from "./cli-confirm.type";

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
