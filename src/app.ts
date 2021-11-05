import { NoDataError } from './core/errors/generic';
import { exampleRequests } from './examples/requests';
import { LogLevel } from './general.type';
import { log, logError } from './helpers/pubsub';
import { duplicateNTimes, getIntInRange, randomHex, sleep } from './helpers/util';

/* eslint-disable @typescript-eslint/no-floating-promises */
function main() {
  async function test() {
    await sleep(2000);
    test();
    log(
      LogLevel.INFO,
      '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789',
    );
  }
  test();

  async function pubLogs() {
    await sleep(500);
    pubLogs();
    log(LogLevel.INFO, `${duplicateNTimes(getIntInRange(1, 3), randomHex())}`);
  }
  pubLogs();

  async function generateError() {
    await sleep(10_000);
    generateError();
    logError(LogLevel.WARN, new NoDataError('Some error handled'));
    throw new Error('Some unexpected error thrown by itself');
  }
  generateError();
}

function init() {
  exampleRequests();

  // setupErrorHandle();
  // setupDashboard();
  main();

  // import from ./examples/
  // examplePromptCLI();
  // exampleErrors();
  // exampleEvents();
  // examplePubsub();
}

init();
