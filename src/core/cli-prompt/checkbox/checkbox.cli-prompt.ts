import { CliPromptBase } from '../base';
import type { IPromptCheckbox } from './checkbox.cli-prompt.type';

class CliPromptCheckbox extends CliPromptBase {
  constructor() {
    super('checkbox');
  }

  private validate(value) {
    if (value.length === 0) return 'You must choose at least one option';
    return true;
  }

  public prompt({ key, question, choices, validate, ...rest }: IPromptCheckbox): Promise<any> {
    return super.prompt({
      key,
      question,
      choices,
      validate: validate || this.validate,
      ...rest,
    });
  }
}

export { CliPromptCheckbox };
