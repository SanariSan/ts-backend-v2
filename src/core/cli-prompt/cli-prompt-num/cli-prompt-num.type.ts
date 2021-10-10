import { IPrompt } from "../cli-prompt-base";

type INumPrompt = Pick<IPrompt, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { INumPrompt };
