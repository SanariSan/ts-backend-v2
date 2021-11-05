import { PubSub } from '../core/events';
import { sleep } from '../helpers/util';

async function examplePubsub() {
  const pubSubClient = new PubSub();

  // key = "test-key";
  const key = pubSubClient.onByKey(
    'message',
    (channel, ...args) => {
      console.log(`Message-app.ts channel: ${channel} | args: ${JSON.stringify(args)}`);
    },
    'test-key',
  );

  pubSubClient.subscribe('test-channel');

  console.log(`Listeners for current pubsub instance: ${pubSubClient.listenerCount('message')}`);

  let i = 0;
  while (pubSubClient.hasKey('message', 'test-key')) {
    await sleep(500);
    pubSubClient.publish('test-channel', 'some text', { a: true });

    if (i++ === 5) {
      // unsubscribe from channel
      pubSubClient.unsubscribe('test-channel');

      // propper quit with removing all listeners and leaving all channels
      pubSubClient.clearAllListeners(); // or pubSubClient.offByKey("message", "test-key"); for each
      pubSubClient.quit(); // after this need to new PubSub() again or can't use
    }
  }

  console.log(`Listeners for current pubsub instance: ${pubSubClient.listenerCount('message')}`);
}

export { examplePubsub };
