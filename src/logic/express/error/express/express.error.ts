import { GenericError } from '../../../../error/generic';

class ExpressError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'ExpressError';
    this.description = `Express generic error`;
  }
}

export { ExpressError };
