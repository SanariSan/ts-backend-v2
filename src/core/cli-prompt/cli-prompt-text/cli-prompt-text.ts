import { CliBase, IPrompt } from "../cli-prompt-base";

class CliText extends CliBase {
	constructor() {
		super("input");
	}

	public prompt({ key, question, defaultAnswer, validate, ...rest }: IPrompt): Promise<any> {
		return super.prompt({ key, question, defaultAnswer, validate: validate, ...rest });
	}
}

export { CliText };
