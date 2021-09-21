import { CliBase } from "../cli-base";
import { IListPrompt } from "./cli-list.type";

class CliList extends CliBase {
	constructor() {
		super("list");
	}

	public prompt({ key, question, choices, ...rest }: IListPrompt): Promise<any> {
		return super.prompt({ key, question, choices, ...rest });
	}
}

export { CliList };
