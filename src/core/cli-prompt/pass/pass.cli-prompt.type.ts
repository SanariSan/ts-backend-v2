import { IPromptBase } from "../base";

type IPromptPass = Pick<IPromptBase, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPromptPass };
