import type Separator from 'inquirer/lib/objects/separator';
import type { ObjectAny } from '../../../general.type';

interface IPromptBase {
  key?: string;
  question: string;
  defaultAnswer?: number | string;
  choices?: Array<
    | string
    | Separator
    | {
        name: string;
        disabled?: string;
        checked?: boolean;
      }
  >;
  validate?: (value: any) => boolean | string;
  rest?: ObjectAny;
}

export type { IPromptBase };
