import { LOG_LEVEL } from "./general.type";
import { logErrorUnexpected } from "./helpers/pubsub";

function setupErrorHandle() {
	/*
        this can be placed here if not using dashboard or logger
	    just catching all errors here and console.logging them

        const sub = new SubMain();
        sub.subscribeErrorExpected();
        sub.subscribeErrorUnexpected();
        sub.sub.onByKey("message", (channel, logLevel, message) => {
            if (channel === "error-expected") {
                console.log(handleErrorExpected(message));
            } else if (channel === "error-unexpected") {
                appendFileSync("./err.txt", JSON.stringify(message.message, message.stack));
                console.log(handleErrorUnexpected(message));
            }
        });
    */

	process.on("uncaughtException", (e: Error) => {
		logErrorUnexpected(LOG_LEVEL.ERROR, e);
	});
	process.on("unhandledRejection", (e: Error) => {
		logErrorUnexpected(LOG_LEVEL.ERROR, e);
	});
}

export { setupErrorHandle };
