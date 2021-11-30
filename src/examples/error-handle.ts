import { CliNoEntryError, NoDataError } from '../core/errors/generic';
import { handleErrorExpected, handleErrorUnexpected } from '../core/errors/handle';
import { Sub } from '../core/events';
import { LogLevel } from '../general.type';
import { logError, logErrorUnexpected } from '../helpers/pubsub';

async function exampleError() {
  console.log('Error #1\n');
  try {
    throw new NoDataError('Some info');
  } catch (error: any) {
    logError(LogLevel.WARN, error);
  }

  console.log('\nError #2\n');
  await new Promise((res, rej) => {
    throw new CliNoEntryError('Some more info');
  }).catch((error: any) => {
    logError(LogLevel.WARN, error);
  });

  // and even if not caught, will be caught
  console.log('\nError #3\n');
  const a: any = {};
  a.foo.bar = false;
}

// original handler
// import { setupErrorHandle } from "../setup-error-handle";

function setupErrorHandle() {
  // this block can be placed here if not using dashboard or logger
  // just catching all errors here and console.logging them
  const sub = new Sub();
  sub.subscribe('error-expected');
  sub.subscribe('error-unexpected');
  sub.onByKey((channel, logLevel, message) => {
    if (channel === 'error-expected') {
      console.log(handleErrorExpected(message));
    } else if (channel === 'error-unexpected') {
      // appendFileSync("./err.txt", JSON.stringify([message.message, message.stack]) + "\n");
      console.log(handleErrorUnexpected(message));
    }
  });

  // these are any error catchers
  process.on('uncaughtException', (e: Error) => {
    logErrorUnexpected(LogLevel.ERROR, e);
  });
  process.on('unhandledRejection', (e: Error) => {
    logErrorUnexpected(LogLevel.ERROR, e);
  });
}

function exampleErrors() {
  setupErrorHandle();
  void exampleError();
}

export { exampleErrors };
