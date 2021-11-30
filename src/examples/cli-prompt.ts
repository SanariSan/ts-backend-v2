import { Separator } from 'inquirer';
import {
  cliPromptCheckbox,
  cliPromptConfirm,
  cliPromptEmail,
  cliPromptList,
  cliPromptNum,
  cliPromptPass,
  cliPromptText,
} from '../access-layer/cli-prompts';

async function examplePromptCLI() {
  const textPromptResult = await cliPromptText({
    message: 'text input',
  });
  const confirmPromptResult = await cliPromptConfirm({ message: 'confirm' });
  const numPromptResult = await cliPromptNum({ message: 'number' });
  const passPromptResult = await cliPromptPass({ message: 'pass' });
  const emailPromptResult = await cliPromptEmail({ message: 'email' });
  const checkboxPromptResult = await cliPromptCheckbox({
    message: 'checkbox',
    choices: [
      new Separator(),
      'first',
      { name: 'second', checked: true },
      new Separator(' = Custom separator = '),
      'third',
      { name: 'fourth', disabled: 'Unavailable now' },
    ],
  });
  const listPromptResult = await cliPromptList({
    message: 'checkbox',
    choices: [
      new Separator(),
      'first',
      'second',
      new Separator(' = Custom separator = '),
      'third',
      { name: 'fourth', disabled: 'Unavailable now' },
    ],
  });

  console.log(textPromptResult);
  console.log(confirmPromptResult);
  console.log(numPromptResult);
  console.log(passPromptResult);
  console.log(emailPromptResult);
  console.log(checkboxPromptResult);
  console.log(listPromptResult);
}

export { examplePromptCLI };
