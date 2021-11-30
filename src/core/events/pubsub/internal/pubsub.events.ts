import { NoClassInstanceError } from '../../../errors/generic';
import { CustomEventEmitter } from '../../native';
import type { TChannels } from './pubsub.events.type';

class PubSubStatic {
  // { PubSub instance : Set of channels names client subscribed to }
  public static clients = new Map<PubSub, Set<TChannels>>();

  // util for getting Set of channels from client
  public static getChannelsSet(emitterInstance): Set<TChannels> | never {
    const set: Set<TChannels> | undefined = this.clients.get(emitterInstance);

    if (set === undefined)
      throw new NoClassInstanceError('Could not find client emitter instance in list');

    return set;
  }
}

class PubSub extends CustomEventEmitter {
  constructor() {
    super();

    PubSubStatic.clients.set(this, new Set());
  }

  // sends message to all clients who has channel in their Sets
  public publish(channel: TChannels, ...args): this {
    for (const [client, channels] of PubSubStatic.clients) {
      if (channels.has(channel)) {
        client.emit('message', channel, ...args);
      }
    }

    return this;
  }

  // adds channel to client
  public subscribe(channel: TChannels): this | never {
    try {
      PubSubStatic.getChannelsSet(this).add(channel);
    } catch (error) {
      throw error;
    }

    return this;
  }

  // removes channel from client
  public unsubscribe(channel: TChannels): this | never {
    try {
      PubSubStatic.getChannelsSet(this).delete(channel);
    } catch (error) {
      throw error;
    }

    return this;
  }

  // removes client AND message listeners
  public quit(): this {
    PubSubStatic.clients.delete(this);
    super.clearAllListeners();

    return this;
  }
}

export { PubSub };
