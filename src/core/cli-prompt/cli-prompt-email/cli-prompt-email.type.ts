import { IPrompt } from "../cli-prompt-base";

type IEmailPrompt = Pick<IPrompt, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IEmailPrompt };
