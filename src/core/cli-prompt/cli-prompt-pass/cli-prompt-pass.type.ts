import { IPrompt } from "../cli-prompt-base";

type IPassPrompt = Pick<IPrompt, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPassPrompt };
