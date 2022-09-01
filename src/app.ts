import type { PoolClient } from 'pg';
import { Pool } from 'pg';
import { sleep } from './helpers/util';
import { setupCli, setupErrorHandle, setupExpress, setupValidateEnv } from './setup';

const pool = new Pool({
  user: 'ts_backend_admin',
  host: 'postgres',
  database: 'ts_backend_db',
  password: 'super_secret_pWd',
  port: 5432,
  max: 25,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30_000,
});

async function initDB() {
  let retries = 0;
  while (retries < 10) {
    retries += 1;
    console.log(`Attempt ${String(retries)}`);

    const client = (await pool.connect().catch(async (error) => {
      console.log(error);
      await sleep(5000);
    })) as PoolClient | undefined;

    if (client !== undefined) {
      client.release();
      return;
    }
  }
}

async function main() {
  const res = await pool.query('SELECT NOW()').catch((error) => {
    console.dir(error);
  });
  console.dir(res, { depth: 5 });
}

/* eslint-disable @typescript-eslint/require-await */
async function init() {
  setupValidateEnv();
  setupErrorHandle();
  setupCli();
  // setupDashboard();

  await initDB();
  await main();

  setupExpress();
  // await examplePromptCLI();
  // await exampleRequests();
  // exampleErrors();
  // examplePubsub();
  // exampleLogging();
}

void init();
