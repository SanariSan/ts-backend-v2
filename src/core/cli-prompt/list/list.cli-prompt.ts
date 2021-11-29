import { CliPromptBase } from '../base';
import type { IPromptList } from './list.cli-prompt.type';

class CliPromptList extends CliPromptBase {
  constructor() {
    super('list');
  }

  public prompt({ key, question, choices, ...rest }: IPromptList): Promise<any> {
    return super.prompt({ key, question, choices, ...rest });
  }
}

export { CliPromptList };
