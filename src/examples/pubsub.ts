import { PubStatic, Sub } from '../core/events';
import { LogLevel } from '../general.type';
import { sleep } from '../helpers/util';

async function examplePubsub() {
  const sub = new Sub();

  // key = "test-key";
  const key = sub.onByKey((channel, logLevel, message) => {
    console.log(`Message-app.ts channel: ${channel} | message: ${message}`);
  }, 'test-key');

  sub.subscribe('test-channel');

  console.log(`Listeners for current pubsub instance: ${sub.getSub().listenerCount('message')}`);

  let i = 0;
  while (sub.getSub().hasKey('message', 'test-key')) {
    await sleep(500);
    PubStatic.publish('test-channel', LogLevel.INFO, 'message here');

    if (i++ === 5) {
      // unsubscribe from channel
      sub.unsubscribe('test-channel');

      // or if quit completely

      // propper quit with removing all listeners and leaving all channels
      sub.quit(); // after this need to new Sub() again or can't use
    }
  }

  console.log(`Listeners for current pubsub instance: ${sub.getSub().listenerCount('message')}`);
}

export { examplePubsub };
