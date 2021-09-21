import { CliBase } from "../cli-base";
import { ICheckboxPrompt } from "./cli-checkbox.type";

class CliCheckbox extends CliBase {
	constructor() {
		super("checkbox");
	}

	private validate(value) {
		if (value.length < 1) return "You must choose at least one option";
		return true;
	}

	public prompt({ key, question, choices, validate, ...rest }: ICheckboxPrompt): Promise<any> {
		return super.prompt({
			key,
			question,
			choices,
			validate: validate || this.validate,
			...rest,
		});
	}
}

export { CliCheckbox };
