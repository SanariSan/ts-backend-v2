import { NoDataError } from './core/errors/generic';
import { LogLevel } from './general.type';
import { log, logError } from './helpers/pubsub';
import { duplicateNTimes, getIntInRange, randomHex, sleep } from './helpers/util';
import { setupDashboard, setupErrorHandle } from './setup';

function main() {
  async function test() {
    await sleep(2000);
    void test();
    log(
      LogLevel.INFO,
      '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789',
    );
  }
  void test();

  async function pubLogs() {
    await sleep(500);
    void pubLogs();
    log(LogLevel.INFO, `${duplicateNTimes(getIntInRange(1, 3), randomHex())}`);
  }
  void pubLogs();

  async function generateError() {
    await sleep(10_000);
    void generateError();
    logError(LogLevel.WARN, new NoDataError('Some error handled'));
    throw new Error('Some unexpected error thrown by itself');
  }
  void generateError();
}

function init() {
  setupErrorHandle();
  setupDashboard();
  main();

  const a = [1, 2, 3, 4, 5];
  const b = {
    a: 1,
  };

  class Test {
    public isFoo = true;

    test() {
      a.forEach((el) => {
        console.log(this.isFoo);
      });
    }
  }

  // import from ./examples/
  // exampleRequests();
  // examplePromptCLI();
  // exampleErrors();
  // exampleEvents();
  // examplePubsub();
}

init();
