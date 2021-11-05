import { CliPromptBase } from '../base';
import { IPromptEmail } from './email.cli-prompt.type';

class CliPromptEmail extends CliPromptBase {
  constructor() {
    super('input');
  }

  // w3c regex
  private validate(value: string) {
    const testResult = /^[\w!#$%&*+./=?^`{|}~’-]+@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/.test(value);

    if (!testResult) return 'Enter valid email';
    return true;
  }

  public prompt({ key, question, defaultAnswer, validate, ...rest }: IPromptEmail): Promise<any> {
    return super.prompt({
      key,
      question,
      defaultAnswer,
      validate: validate || this.validate,
      ...rest,
    });
  }
}

export { CliPromptEmail };
