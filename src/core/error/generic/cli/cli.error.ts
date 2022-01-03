import { GenericError } from '../generic.error';

class CliError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'CliError';
    this.description = `Related to cli i/o`;
  }
}

export { CliError };
