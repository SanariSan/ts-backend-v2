import { IPromptBase } from "../base";

type IPromptEmail = Pick<IPromptBase, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPromptEmail };
