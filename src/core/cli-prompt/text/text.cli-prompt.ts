import { CliPromptBase } from "../base";
import { IPromptText } from "./text.cli-prompt.type";

class CliPromptText extends CliPromptBase {
	constructor() {
		super("input");
	}

	public prompt({ key, question, defaultAnswer, validate, ...rest }: IPromptText): Promise<any> {
		return super.prompt({ key, question, defaultAnswer, validate: validate, ...rest });
	}
}

export { CliPromptText };
