import { CliBase } from "../cli-prompt-base";
import { IEmailPrompt } from "./cli-prompt-email.type";

class CliEmail extends CliBase {
	constructor() {
		super("input");
	}

	//w3c regex
	private validate(value: string) {
		let testResult =
			/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);

		if (!testResult) return "Enter valid email";
		return true;
	}

	public prompt({ key, question, defaultAnswer, validate, ...rest }: IEmailPrompt): Promise<any> {
		return super.prompt({
			key,
			question,
			defaultAnswer,
			validate: validate || this.validate,
			...rest,
		});
	}
}

export { CliEmail };
