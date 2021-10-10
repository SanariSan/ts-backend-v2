import { IPrompt } from "../cli-prompt-base";

type IListPrompt = Pick<IPrompt, "key" | "question" | "choices" | "rest">;

export { IListPrompt };
