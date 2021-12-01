import { DashboardLogsController } from './core/dashboard/controllers';
import { NoDataError } from './core/errors/generic';
import { exampleRequests } from './examples/requests';
import { LogLevel } from './general.type';
import { log, logCustom, logError } from './helpers/pubsub';
import { duplicateNTimes, getIntInRange, randomHex, sleep } from './helpers/util';
import { setupDashboard, setupErrorHandle } from './setup';

function main() {
  // sub to custom channel
  DashboardLogsController.subscribeChannel('custom-channel', `Custom-Option`);

  // publish to custom channel
  logCustom('custom-channel', LogLevel.INFO, 'message');

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

async function init() {
  // setupErrorHandle();
  // setupDashboard();
  // main();

  await exampleRequests();
  // import from ./examples/
  // await examplePromptCLI();
  // exampleRequests();
  // exampleErrors();
  // exampleEvents();
  // examplePubsub();
}

void init();
