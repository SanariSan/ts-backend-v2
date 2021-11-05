import inquirer, { QuestionTypeName } from 'inquirer';
import { randomHex } from '../../../helpers/util';
import { CliInternalModuleError, CliNoEntryError } from '../../errors/generic';
import { IPromptBase } from './base.cli-prompt.type';

class CliPromptBase {
  protected value: Map<string, any> = new Map();

  protected questionType: QuestionTypeName;

  constructor(questionType: QuestionTypeName) {
    this.questionType = questionType;
  }

  public getValue(key: string) {
    if (!this.value.has(key))
      throw new CliNoEntryError(
        `Values storage in {${this.constructor.name}} doesn't have {${key}} in it.`,
      );

    return this.value.get(key);
  }

  protected setValue(key: string, value): void {
    this.value.set(key, value);
  }

  protected prompt({
    key = randomHex(),
    question = '',
    defaultAnswer = '',
    choices,
    validate,
    ...rest
  }: IPromptBase): Promise<any> {
    return inquirer
      .prompt({
        type: this.questionType,
        name: key,
        message: question,
        default: defaultAnswer,
        choices,
        validate,
        ...rest,
      })
      .then((answer) => this.setValue(key, answer[key]))
      .then(() => key)
      .catch((error) => {
        throw new CliInternalModuleError(error);
      });
  }
}

export { CliPromptBase };
