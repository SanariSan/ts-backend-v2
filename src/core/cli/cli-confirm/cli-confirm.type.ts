import { IPrompt } from "../cli-base";

type IConfirmPrompt = Pick<IPrompt, "key" | "question" | "rest">;

export { IConfirmPrompt };
