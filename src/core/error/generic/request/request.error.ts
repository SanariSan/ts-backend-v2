import { GenericError } from '../generic.error';

class RequestError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'RequestError';
    this.description = `Request error, failed before or during sending`;
  }
}

export { RequestError };
