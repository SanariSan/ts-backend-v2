import { Separator } from 'inquirer';
import {
  CliPromptCheckbox,
  CliPromptConfirm,
  CliPromptEmail,
  CliPromptList,
  CliPromptNum,
  CliPromptPass,
  CliPromptText,
} from '../core/cli-prompt';

async function examplePromptCLI() {
  const cliText = new CliPromptText();
  const cliConfirm = new CliPromptConfirm();
  const cliNum = new CliPromptNum();
  const cliPass = new CliPromptPass();
  const cliEmail = new CliPromptEmail();
  const cliList = new CliPromptList();
  const cliCheckbox = new CliPromptCheckbox();

  // you can do multiple prompts from one instance, then get results by keys
  // make sure you trying to get results from right instance!
  // *i.e. can't get text prompt results from num prompt instance and vice versa

  // (1) can pass key: "val" and get it back to variable
  const cliTextKey = await cliText.prompt({ key: 'text', question: 'Text prompt' });
  // (2) or pass no key to get random assigned
  const cliConfirmKey = await cliConfirm.prompt({ question: 'Confirm prompt' });
  // (3) also could provide no variable, in this case use custom key
  await cliNum.prompt({ key: 'number', question: 'Number prompt' });
  await cliPass.prompt({ key: 'pass', question: 'Password prompt' });
  await cliEmail.prompt({ key: 'email', question: 'Email prompt' });
  await cliList.prompt({
    key: 'list',
    question: 'List prompt',
    choices: [
      new Separator(),
      'first',
      'second',
      new Separator(' = Custom separator = '),
      'third',
      { name: 'fourth', disabled: 'Unavailable now' },
    ],
  });
  await cliCheckbox.prompt({
    key: 'checkbox',
    question: 'Checkbox prompt',
    choices: [
      new Separator(),
      'first',
      { name: 'second', checked: true },
      new Separator(' = Custom separator = '),
      'third',
      { name: 'fourth', disabled: 'Unavailable now' },
    ],
  });

  // (1)
  console.log(cliTextKey);
  console.log(cliText.getValue(cliTextKey));
  // (2)
  console.log(cliConfirmKey);
  console.log(cliConfirm.getValue(cliConfirmKey));
  // (3)
  console.log(cliNum.getValue('number'));
  console.log(cliPass.getValue('pass'));
  console.log(cliEmail.getValue('email'));
  console.log(cliList.getValue('list'));
  console.log(cliCheckbox.getValue('checkbox'));
}

export { examplePromptCLI };
