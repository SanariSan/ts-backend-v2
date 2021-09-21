import { IPrompt } from "../cli-base";

type INumPrompt = Pick<IPrompt, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { INumPrompt };
