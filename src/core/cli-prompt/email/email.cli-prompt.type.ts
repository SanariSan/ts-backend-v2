import type { IPromptBase } from '../base';

type IPromptEmail = Pick<IPromptBase, 'key' | 'question' | 'defaultAnswer' | 'validate' | 'rest'>;

export type { IPromptEmail };
