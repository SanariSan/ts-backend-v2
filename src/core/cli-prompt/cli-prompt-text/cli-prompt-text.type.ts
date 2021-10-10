import { IPrompt } from "../cli-prompt-base";

type ITextPrompt = Pick<IPrompt, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { ITextPrompt };
