import type { IPromptBase } from '../base';

type IPromptNum = Pick<IPromptBase, 'key' | 'question' | 'defaultAnswer' | 'validate' | 'rest'>;

export type { IPromptNum };
