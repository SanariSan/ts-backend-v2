import { IPrompt } from "../cli-base";

type ITextPrompt = Pick<IPrompt, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { ITextPrompt };
