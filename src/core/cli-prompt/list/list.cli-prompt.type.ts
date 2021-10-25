import { IPromptBase } from "../base";

type IPromptList = Pick<IPromptBase, "key" | "question" | "choices" | "rest">;

export { IPromptList };
