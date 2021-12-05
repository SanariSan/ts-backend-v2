import type { EventEmitter } from 'node:stream';
import { NoClassInstanceError } from '../../errors/generic';

class PubSubStorage {
  // { Emitter instance: Set of channels names client subscribed to }
  private static readonly instancesToChannelsMap = new Map<EventEmitter, Set<string>>();

  public static getInstancesToChannelsMap() {
    return this.instancesToChannelsMap;
  }

  public static getChannels(emitterInstance: EventEmitter): Set<string> | never {
    const set: Set<string> | undefined = this.instancesToChannelsMap.get(emitterInstance);

    if (set === undefined)
      throw new NoClassInstanceError('Could not find emitter instance in list');

    return set;
  }

  public static setChannels(emitterInstance: EventEmitter, channels: Set<string>) {
    this.instancesToChannelsMap.set(emitterInstance, channels);
  }
}

export { PubSubStorage };
