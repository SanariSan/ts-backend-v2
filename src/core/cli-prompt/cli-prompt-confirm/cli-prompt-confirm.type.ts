import { IPrompt } from "../cli-prompt-base";

type IConfirmPrompt = Pick<IPrompt, "key" | "question" | "rest">;

export { IConfirmPrompt };
