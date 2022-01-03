import { CliError } from '../cli.error';

class CliPromptError extends CliError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'CliPromptError';
    this.description = 'Prompt module error';
  }
}

export { CliPromptError };
