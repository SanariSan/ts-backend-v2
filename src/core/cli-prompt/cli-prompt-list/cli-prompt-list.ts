import { CliBase } from "../cli-prompt-base";
import { IListPrompt } from "./cli-prompt-list.type";

class CliList extends CliBase {
	constructor() {
		super("list");
	}

	public prompt({ key, question, choices, ...rest }: IListPrompt): Promise<any> {
		return super.prompt({ key, question, choices, ...rest });
	}
}

export { CliList };
