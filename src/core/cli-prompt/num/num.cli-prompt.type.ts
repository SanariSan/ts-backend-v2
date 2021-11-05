import { IPromptBase } from '../base';

type IPromptNum = Pick<IPromptBase, 'key' | 'question' | 'defaultAnswer' | 'validate' | 'rest'>;

export { IPromptNum };
