import { CliPromptBase } from '../base';
import type { IPromptText } from './text.cli-prompt.type';

class CliPromptText extends CliPromptBase {
  constructor() {
    super('input');
  }

  public prompt({ key, question, defaultAnswer, validate, ...rest }: IPromptText): Promise<any> {
    return super.prompt({ key, question, defaultAnswer, validate, ...rest });
  }
}

export { CliPromptText };
