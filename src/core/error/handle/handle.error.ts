import type { IError } from '../error.core.type';
import { CliError, CliPromptError, RequestError } from '../generic';

// only example, should be extended when needed
function handle(e: Readonly<IError>) {
  if (e instanceof CliPromptError) {
    // empty
  } else if (e instanceof CliError) {
    // empty
  } else if (e instanceof RequestError) {
    // empty
  } else {
    // empty
  }
}

export { handle };
