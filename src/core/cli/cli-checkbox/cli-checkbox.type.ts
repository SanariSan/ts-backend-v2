import { IPrompt } from "../cli-base";

type ICheckboxPrompt = Pick<IPrompt, "key" | "question" | "choices" | "validate" | "rest">;

export { ICheckboxPrompt };
