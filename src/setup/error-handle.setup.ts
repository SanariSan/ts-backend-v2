import { appendFile } from 'node:fs/promises';
import { handleErrorExpected, handleErrorUnexpected } from '../core/errors/handle';
import { Sub } from '../core/events';
import { ELOG_LEVEL } from '../general.type';
import { logErrorUnexpected } from '../helpers/pubsub';

function setupErrorHandle() {
  // this can be placed here if not using dashboard or logger
  // just catching all errors here and console.logging them

  // const sub = new Sub();
  // sub.subscribe('error-expected');
  // sub.subscribe('error-unexpected');
  // sub.onByKey(async (channel, logLevel, message) => {
  //   if (channel === 'error-expected') {
  //     console.log(handleErrorExpected(message));
  //   } else if (channel === 'error-unexpected') {
  //     await appendFile(
  //       './err.txt',
  //       JSON.stringify([message, message.message, message.stack]) + '\n',
  //     );
  //     console.log(handleErrorUnexpected(message));
  //   }
  // });

  process.on('uncaughtException', (e: Error) => {
    logErrorUnexpected(ELOG_LEVEL.ERROR, e);
  });
  process.on('unhandledRejection', (e: Error) => {
    logErrorUnexpected(ELOG_LEVEL.ERROR, e);
  });
}

export { setupErrorHandle };
