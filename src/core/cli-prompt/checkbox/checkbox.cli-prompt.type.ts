import type { IPromptBase } from '../base';

type IPromptCheckbox = Pick<IPromptBase, 'key' | 'question' | 'choices' | 'validate' | 'rest'>;

export type { IPromptCheckbox };
