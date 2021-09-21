import { IPrompt } from "../cli-base";

type IEmailPrompt = Pick<IPrompt, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IEmailPrompt };
