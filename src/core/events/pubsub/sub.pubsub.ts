import type { TChannels } from './internal';
import { PubSub } from './internal';

class Sub {
  private readonly sub: PubSub;

  constructor(sub?: PubSub) {
    this.sub = sub ?? new PubSub();
  }

  public getSub() {
    return this.sub;
  }

  public subscribe(channel: TChannels) {
    this.sub.subscribe(channel);
  }

  public unsubscribe(channel: TChannels) {
    this.sub.unsubscribe(channel);
  }

  public onByKey(cb, key?: string) {
    return this.sub.onByKey('message', cb, key);
  }

  public offByKey(key) {
    return this.sub.offByKey('message', key);
  }

  public quit() {
    return this.sub.quit();
  }
}

export { Sub };
