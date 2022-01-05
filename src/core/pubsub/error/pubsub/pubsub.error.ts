import { GenericError } from '../../../error';

class PubSubError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'PubSubError';
    this.description = 'PubSub related error';
  }
}

export { PubSubError };
