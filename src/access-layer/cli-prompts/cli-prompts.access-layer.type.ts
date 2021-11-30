import type Separator from 'inquirer/lib/objects/separator';
import type { ObjectAny } from '../../general.type';

type TChoices = Array<
  | string
  | Separator
  | {
      name: string;
      value?: ObjectAny;
      disabled?: string;
      checked?: boolean;
    }
>;

interface IPrompt {
  message: string;
  defaultAnswer?: number | string | boolean;
  choices?: TChoices;
  validate?: (value: string) => boolean | string;
}

export type { IPrompt, TChoices };
