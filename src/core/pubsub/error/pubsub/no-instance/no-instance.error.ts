import { PubSubError } from '../pubsub.error';

class NoInstanceError extends PubSubError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'NoInstanceError';
    this.description = `Attempt to get channels from emitter, that is not prepared for that`;
  }
}

export { NoInstanceError };
