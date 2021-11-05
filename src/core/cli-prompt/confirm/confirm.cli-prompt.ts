import { CliPromptBase } from '../base';
import { IPromptConfirm } from './confirm.cli-prompt.type';

class CliPromptConfirm extends CliPromptBase {
  constructor() {
    super('confirm');
  }

  // result value either true or false
  public prompt({ key, question, ...rest }: IPromptConfirm): Promise<any> {
    return super.prompt({ key, question, ...rest });
  }
}

export { CliPromptConfirm };
