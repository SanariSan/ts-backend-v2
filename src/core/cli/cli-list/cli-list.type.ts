import { IPrompt } from "../cli-base";

type IListPrompt = Pick<IPrompt, "key" | "question" | "choices" | "rest">;

export { IListPrompt };
