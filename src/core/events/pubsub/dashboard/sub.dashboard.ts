import { PubSub } from '../pubsub.events';
import { SubGeneric } from '../generic';
import { TChannels } from '../pubsub.events.type';

class SubDashboard extends SubGeneric {
  constructor() {
    super(new PubSub());
  }

  get sub() {
    return super.sub;
  }

  // exposing for cases when don't know exact amount and names of channels (spawning threads etc.)
  public subscribe(channel: TChannels) {
    super.subscribe(channel);
  }

  // unsubscribe method not used for now since not removing listeners
  // even when screens of Dashboard changed
  public unsubscribe(channel: TChannels) {
    super.unsubscribe(channel);
  }

  public subscribeLog() {
    super.subscribe('dash-log');
    super.subscribeLog();
  }

  public subscribeLogAlt() {
    super.subscribe('dash-log-alt');
    super.subscribeLog();
  }

  public subscribeErrorExpected() {
    super.subscribe('dash-error-expected');
    super.subscribeErrorExpected();
  }

  public subscribeErrorUnexpected() {
    super.subscribe('dash-error-unexpected');
    super.subscribeErrorExpected();
  }
}

export { SubDashboard };
