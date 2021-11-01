import { AxiosError } from "axios";
import { LOG_LEVEL } from "../../general.type";
import { logErrorUnexpected } from "../pubsub";

const handleErrorResponse = async (response: AxiosError): Promise<any> => {
	// temp, actually need to parse response and define what error is this
	logErrorUnexpected(LOG_LEVEL.WARN, response.message);

	// here will probably call some request related error definer, then reject defining result
	// so I can catch it in the place it's called and logError after
	return Promise.reject(response.response);
};

export { handleErrorResponse };
