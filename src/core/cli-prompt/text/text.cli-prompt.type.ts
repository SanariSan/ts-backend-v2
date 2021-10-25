import { IPromptBase } from "../base";

type IPromptText = Pick<IPromptBase, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPromptText };