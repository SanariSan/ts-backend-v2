import { IPrompt } from "../cli-base";

type IPassPrompt = Pick<IPrompt, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPassPrompt };
