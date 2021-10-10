import inquirer, { QuestionTypeName } from "inquirer";
import { CliNoEntryError } from "../../errors";
import { IPrompt } from "./cli-prompt-base.type";

class CliBase {
	protected value: Map<string, any> = new Map();
	protected questionType: QuestionTypeName;

	constructor(questionType: QuestionTypeName) {
		this.questionType = questionType;
	}

	public getValue(key: string) {
		if (!this.value.has(key))
			throw new CliNoEntryError(
				`Values storage in {${this.constructor.name}} doesn't have {${key}} in it.`,
			);

		return this.value.get(key);
	}

	protected setValue(key: string, value): void {
		this.value.set(key, value);
	}

	protected prompt({
		key,
		question: question = "",
		defaultAnswer: defaultAnswer = "",
		choices,
		validate,
		...rest
	}: IPrompt): Promise<any> {
		return inquirer
			.prompt({
				type: this.questionType,
				name: key,
				message: question,
				default: defaultAnswer,
				choices,
				validate,
				...rest,
			})
			.then((answer) => this.setValue(key, answer[key]))
			.catch((e) => {
				console.log("ERROR");
				console.log(e);
			});
	}
}

export { CliBase };
