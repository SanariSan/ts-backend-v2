import { prompt } from 'inquirer';
import { CliInternalModuleError } from '../../core/errors/generic';
import type { ObjectAny } from '../../general.type';
import { randomHex } from '../../helpers/util';
import type { IPrompt } from './cli-prompts.access-layer.type';
import { validateEmailDefault, validateNumDefault, validatePassDefault } from './validators';

const cliPromptEmail = ({
  message,
  defaultAnswer = '',
  validate = validateEmailDefault,
}: Pick<IPrompt, 'message' | 'defaultAnswer' | 'validate'>): Promise<string> => {
  const name = randomHex();
  return prompt({ type: 'input', name, message, default: defaultAnswer, validate })
    .then((value) => value[name] as string)
    .catch((error: Error) => {
      throw new CliInternalModuleError(error.message);
    });
};

const cliPromptNum = ({
  message,
  defaultAnswer = '',
  validate = validateNumDefault,
}: Pick<IPrompt, 'message' | 'defaultAnswer' | 'validate'>): Promise<number> => {
  const name = randomHex();
  return prompt({ type: 'number', name, message, default: defaultAnswer, validate })
    .then((value) => value[name] as number)
    .catch((error: Error) => {
      throw new CliInternalModuleError(error.message);
    });
};

const cliPromptPass = ({
  message,
  defaultAnswer = '',
  validate = validatePassDefault,
}: Pick<IPrompt, 'message' | 'defaultAnswer' | 'validate'>): Promise<string> => {
  const name = randomHex();
  return prompt({ type: 'password', name, message, default: defaultAnswer, validate })
    .then((value) => value[name] as string)
    .catch((error: Error) => {
      throw new CliInternalModuleError(error.message);
    });
};

const cliPromptText = ({
  message,
  defaultAnswer = '',
  validate,
}: Pick<IPrompt, 'message' | 'defaultAnswer' | 'validate'>): Promise<string> => {
  const name = randomHex();
  return prompt({ type: 'input', name, message, default: defaultAnswer, validate })
    .then((value) => value[name] as string)
    .catch((error: Error) => {
      throw new CliInternalModuleError(error.message);
    });
};

const cliPromptConfirm = ({
  message,
  defaultAnswer = '',
}: Pick<IPrompt, 'message' | 'defaultAnswer'>): Promise<boolean> => {
  const name = randomHex();
  return prompt({ type: 'confirm', name, message, default: defaultAnswer })
    .then((value) => value[name] as boolean)
    .catch((error: Error) => {
      throw new CliInternalModuleError(error.message);
    });
};

const cliPromptCheckbox = ({
  message,
  choices,
}: Pick<IPrompt, 'message' | 'defaultAnswer' | 'choices'>): Promise<string[] | ObjectAny[]> => {
  const name = randomHex();
  return prompt({ type: 'checkbox', name, message, choices })
    .then((value) => value[name] as string[] | ObjectAny[])
    .catch((error: Error) => {
      throw new CliInternalModuleError(error.message);
    });
};

const cliPromptList = ({
  message,
  choices,
}: Pick<IPrompt, 'message' | 'defaultAnswer' | 'validate' | 'choices'>): Promise<
  string | ObjectAny
> => {
  const name = randomHex();
  return prompt({ type: 'list', name, message, choices })
    .then((value) => value[name] as string | ObjectAny)
    .catch((error: Error) => {
      throw new CliInternalModuleError(error.message);
    });
};

export {
  cliPromptCheckbox,
  cliPromptConfirm,
  cliPromptEmail,
  cliPromptList,
  cliPromptNum,
  cliPromptPass,
  cliPromptText,
};
