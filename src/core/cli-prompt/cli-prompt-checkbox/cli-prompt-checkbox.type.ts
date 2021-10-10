import { IPrompt } from "../cli-prompt-base";

type ICheckboxPrompt = Pick<IPrompt, "key" | "question" | "choices" | "validate" | "rest">;

export { ICheckboxPrompt };
