import { dashboardSubscribeChannel } from './access-layer/logger/dashboard';
import { NoDataError } from './core/errors/generic';
import { examplePromptCLI } from './examples/cli-prompt';
import { ELOG_LEVEL } from './general.type';
import { log, logCustom, logError } from './helpers/pubsub';
import { duplicateNTimes, rndIntInRange, randomHex, sleep } from './helpers/util';
import { setupDashboard, setupErrorHandle } from './setup';

function main() {
  // sub to custom channel
  dashboardSubscribeChannel('custom-channel', `Custom-Option`);

  // publish to custom channel
  logCustom('custom-channel', ELOG_LEVEL.INFO, 'message');

  async function test() {
    await sleep(2000);
    void test();
    log(
      ELOG_LEVEL.INFO,
      '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789',
    );
  }
  void test();

  async function pubLogs() {
    await sleep(500);
    void pubLogs();
    log(ELOG_LEVEL.INFO, `${duplicateNTimes(rndIntInRange(1, 3), await randomHex())}`);
  }
  void pubLogs();

  async function generateError() {
    await sleep(10_000);
    void generateError();
    logError(ELOG_LEVEL.WARN, new NoDataError('Some error handled'));
    throw new Error('Some unexpected error thrown by itself');
  }
  void generateError();
}

/* eslint-disable @typescript-eslint/require-await */
async function init() {
  // setupErrorHandle();
  // setupDashboard();
  // main();

  await examplePromptCLI();

  // await exampleRequests();
  // import from ./examples/
  // await examplePromptCLI();
  // exampleRequests();
  // exampleErrors();
  // exampleEvents();
  // examplePubsub();
}

void init();
