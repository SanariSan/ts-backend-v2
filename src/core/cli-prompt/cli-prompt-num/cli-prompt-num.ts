import { CliBase } from "../cli-prompt-base";
import { INumPrompt } from "./cli-prompt-num.type";

class CliNum extends CliBase {
	constructor() {
		super("number");
	}

	//if not number entered - value empty string
	private validate(value) {
		if (isNaN(parseFloat(value)) || !isFinite(value)) return "Enter correct number (12.345)";
		return true;
	}

	public prompt({ key, question, defaultAnswer, validate, ...rest }: INumPrompt): Promise<any> {
		return super.prompt({
			key,
			question,
			defaultAnswer,
			validate: validate || this.validate,
			...rest,
		});
	}
}

export { CliNum };
