import { PubStatic, Sub } from '../core/events';
import { ELOG_LEVEL } from '../general.type';
import { sleep } from '../helpers/util';

async function examplePubsub() {
  const sub = new Sub();

  // key = "test-key";
  const key = sub.onByKey((channel: string, logLevel, message: unknown) => {
    console.log(`Message-app.ts channel: ${channel} | message: ${String(message)}`);
  }, 'test-key');

  sub.subscribe('test-channel');

  console.log(`Listeners for current pubsub instance: ${sub.getSub().listenerCount('message')}`);

  let i = 0;
  while (sub.getSub().hasKey('message', 'test-key')) {
    /* eslint-disable-next-line no-await-in-loop */
    await sleep(500);
    PubStatic.publish('test-channel', ELOG_LEVEL.INFO, 'message here');

    i += 1;
    if (i === 5) {
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
