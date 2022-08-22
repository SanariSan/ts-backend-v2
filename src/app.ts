import { publishCustom, Sub } from './access-layer/events/pubsub';
import { ELOG_LEVEL } from './general.type';
import {
  setupCli,
  setupDashboard,
  setupErrorHandle,
  setupExpress,
  setupValidateEnv,
} from './setup';
import { lunchTestLogging } from './examples/test-logging';

function main() {
  // bare logs, later will move to core/logger/cli + cli logger access-layer/logger/cli
  // for now exposed
  // const sub = new Sub();
  // sub.listen(({ channel, logLevel, message }) => {
  //   console.log(`Channel: ${channel} | Message: ${String(message)}`);
  // });
  // sub.subscribe('log');
  // publish to custom channel for everyone
  // publishCustom('custom-channel', ELOG_LEVEL.INFO, 'message');
  lunchTestLogging();
}

/* eslint-disable @typescript-eslint/require-await */
async function init() {
  setupValidateEnv();
  setupErrorHandle();
  setupCli();
  // setupDashboard();
  // setupExpress();
  main();

  // TODO: call .env values guard

  // await examplePromptCLI();
  // await exampleRequests();
  // exampleErrors();
  // examplePubsub();
}

void init();
