import { publishError, publishErrorUnexpected } from '../access-layer/events/pubsub';
import { CliError, IError, NoDataError } from '../core/error';
import { ELOG_LEVEL } from '../general.type';
import { setupErrorHandle } from '../setup';

async function exampleError() {
  console.log('Error #1\n');
  try {
    throw new NoDataError('Some info');
  } catch (error: unknown) {
    publishError(ELOG_LEVEL.WARN, error as IError);
  }

  console.log('\nError #2\n');
  await new Promise(() => {
    throw new CliError('Some more info');
  }).catch((error: unknown) => {
    publishErrorUnexpected(ELOG_LEVEL.WARN, error as Error);
  });

  // and even if not caught, will be caught
  console.log('\nError #3\n');
  const a: any = {};
  a.foo.bar = false;
}

function exampleErrors() {
  setupErrorHandle();
  void exampleError();
}

export { exampleErrors };
