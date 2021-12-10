import { publishLog, publishError } from './access-layer/events/pubsub';
import { NoDataError } from './core/errors/generic';
import { ELOG_LEVEL } from './general.type';
import { duplicateNTimes, randomHexSync, rndIntInRange, sleep } from './helpers/util';

function lunchTestLogging() {
  async function test() {
    await sleep(2000);
    void test();
    publishLog(
      ELOG_LEVEL.INFO,
      '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789',
    );
  }
  void test();

  async function pubLogs() {
    await sleep(500);
    void pubLogs();
    publishLog(ELOG_LEVEL.INFO, `${duplicateNTimes(rndIntInRange(1, 3), randomHexSync())}`);
  }
  void pubLogs();

  async function generateError() {
    await sleep(10_000);
    void generateError();
    publishError(ELOG_LEVEL.WARN, new NoDataError('Some error handled'));
    throw new Error('Some unexpected error thrown by itself');
  }
  void generateError();
}

export { lunchTestLogging };