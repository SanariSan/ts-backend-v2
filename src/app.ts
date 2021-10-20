import { sleep } from "./helpers/util";
import { setupErrorHandle } from "./setupErrorHandle";
import { test } from "./test";

async function main() {}

function init() {
	setupErrorHandle();
	main();
}

init();
