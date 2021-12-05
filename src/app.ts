import { log, logCustom, logError, Sub } from './access-layer/events/pubsub';
import { dashboardSubscribeChannel } from './access-layer/logger/dashboard';
import { NoDataError } from './core/errors/generic';
import { examplePromptCLI } from './examples/cli-prompt';
import { examplePubsub } from './examples/pubsub';
import { ELOG_LEVEL } from './general.type';
import { duplicateNTimes, rndIntInRange, randomHex, sleep } from './helpers/util';
import { setupDashboard, setupErrorHandle } from './setup';

function main() {
  // bare logs, later will move to core/logger/cli + cli logger access-layer/logger/cli
  // for now exposed
  const sub = new Sub();
  sub.listen(({ channel, logLevel, message }) => {
    console.log(`Channel: ${channel} | Message: ${String(message)}`);
  });
  sub.subscribe('log');

  // sub to custom channel for dashboard (it has own Sub instance inside)
  dashboardSubscribeChannel('custom-channel', `Custom-Option`);

  // publish to custom channel for everyone
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
  setupErrorHandle();
  // setupDashboard();
  // main();

  // await examplePromptCLI();
  // await exampleRequests();
  // exampleErrors();
  // examplePubsub();
}

void init();
