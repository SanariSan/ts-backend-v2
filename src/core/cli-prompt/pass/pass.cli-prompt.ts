import { CliPromptBase } from '../base';
import type { IPromptPass } from './pass.cli-prompt.type';

class CliPromptPass extends CliPromptBase {
  constructor() {
    super('password');
  }

  private validate(value: string) {
    if (value.length < 6 || value.length > 24 || !/^[\w!#$%&*@^-]+$/.test(value))
      return 'Enter valid password (6-24 chars [A-Za-z0-9!@#$%^&*_-])';
    return true;
  }

  public prompt({ key, question, defaultAnswer, validate, ...rest }: IPromptPass): Promise<any> {
    return super.prompt({
      key,
      question,
      defaultAnswer,
      validate: validate || this.validate,
      rest: { ...rest, mask: '*' },
    });
  }
}

export { CliPromptPass };
