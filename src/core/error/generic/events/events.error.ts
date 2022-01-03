import { GenericError } from '../generic.error';

class EventsError extends GenericError {
  public name: string;

  public description: string;

  constructor(message: string) {
    super(message);

    this.name = 'EventsError';
    this.description = `Events related error`;
  }
}

export { EventsError };
