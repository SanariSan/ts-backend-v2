import { GenericError } from '../../../error';

class CliPromptError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'CliPromptError';
    this.description = 'Cli prompt module error';
  }
}

export { CliPromptError };
