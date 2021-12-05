import { logErrorUnexpected, Sub } from '../access-layer/events/pubsub';
import type { GenericError } from '../core/errors/generic';
import { CliNoEntryError, NoDataError } from '../core/errors/generic';
import { handleErrorExpected, handleErrorUnexpected } from '../core/errors/handle';
import { ELOG_LEVEL } from '../general.type';

async function exampleError() {
  console.log('Error #1\n');
  try {
    throw new NoDataError('Some info');
  } catch (error: unknown) {
    logErrorUnexpected(ELOG_LEVEL.WARN, error as Error);
  }

  console.log('\nError #2\n');
  await new Promise(() => {
    throw new CliNoEntryError('Some more info');
  }).catch((error: unknown) => {
    logErrorUnexpected(ELOG_LEVEL.WARN, error as Error);
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
  sub.listen(({ channel, logLevel, message }) => {
    if (channel === 'error-expected') {
      console.log(handleErrorExpected(message as GenericError));
    } else if (channel === 'error-unexpected') {
      // appendFileSync("./err.txt", JSON.stringify([message.message, message.stack]) + "\n");
      console.log(handleErrorUnexpected(message as Error));
    }
  });

  // these are any error catchers
  process.on('uncaughtException', (e: Readonly<Error>) => {
    logErrorUnexpected(ELOG_LEVEL.ERROR, e);
  });
  process.on('unhandledRejection', (e: Readonly<Error>) => {
    logErrorUnexpected(ELOG_LEVEL.ERROR, e);
  });
}

function exampleErrors() {
  setupErrorHandle();
  void exampleError();
}

export { exampleErrors };
