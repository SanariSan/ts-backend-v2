import { PubSub } from './core/events';
import { sleep } from './helpers/util';

async function test() {
  const pubSubClient = new PubSub();

  setInterval(() => {
    pubSubClient.publish('channel-test', 'some text', { a: true });
  }, 500);

  await sleep(6000);
  try {
    pubSubClient.offByKey('message', 'app-init-key');
  } catch (error) {
    pubSubClient.publish('error', error);
  }
}

export { test };
