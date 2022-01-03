import { GenericError } from '../generic.error';

class ResponseError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'ResponseError';
    this.description = `Returned bad status/message/timed out`;
  }
}

export { ResponseError };
