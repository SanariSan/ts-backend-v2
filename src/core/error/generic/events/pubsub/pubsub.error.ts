import { EventsError } from '../events.error';

class PubSubError extends EventsError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'PubSubError';
    this.description = 'PubSub related error';
  }
}

export { PubSubError };
