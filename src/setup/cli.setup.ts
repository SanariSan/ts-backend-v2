import { EventEmitter } from 'node:events';
import { cliStart, cliSubscribeChannel } from '../access-layer/logger/cli';

function setupCli() {
  // tweak listeners amount
  EventEmitter.defaultMaxListeners = 150;

  // subscribe to all channels needed (can add later, these are basic)
  cliSubscribeChannel('log');
  cliSubscribeChannel('error-expected');
  cliSubscribeChannel('error-unexpected');

  cliStart();
}

export { setupCli };
