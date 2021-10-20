import { sendForm, sendLinkParams, sendQueryParams } from "../api-wrappers";
import { handleError } from "../core/errors";

async function requests() {
	const respForm = await sendForm().catch((e) => {
		handleError(e);
	});
	const { status: sForm, headers: hForm, fullResponse: frForm, data: dForm } = respForm || {};

	const respParams = await sendLinkParams().catch((e) => {
		handleError(e);
	});
	const { status: sPrm, headers: hPrm, fullResponse: frPrm, data: dPrm } = respParams || {};

	const respQuery = await sendQueryParams().catch((e) => {
		handleError(e);
	});
	const { status: sQry, headers: hQry, fullResponse: frQry, data: dQry } = respQuery || {};

	console.dir({ sForm, dForm }, { depth: 10, colors: true });
	console.dir({ sPrm, dPrm }, { depth: 10, colors: true });
	console.dir({ sQry, dQry }, { depth: 10, colors: true });
}

requests();
