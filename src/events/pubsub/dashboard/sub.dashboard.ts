import { PubSub } from "../..";

const pubSubClientLog = new PubSub();
const pubSubClientExpectedError = new PubSub();
const pubSubClientUnExpectedError = new PubSub();

class DashboardSub {
	public static subToLogs(cb) {
		pubSubClientLog.onByKey("message", (channel, message) => {
			cb({
				type: "log",
				optionName: ~~(Math.random() * 2) === 0 ? "Logs" : "Logs-Alt",
				message,
			});
		});
		pubSubClientLog.subscribe("dash-log");
	}

	public static subToExpectedErrors(cb) {
		pubSubClientExpectedError.onByKey("message", (channel, message) => {
			cb({
				type: "error",
				optionName: "Errors",
				message,
			});
			handleExpectedError(message);
		});
		pubSubClientExpectedError.subscribe("dash-error-expected");
	}

	public static subToUnexpectedErrors(cb) {
		pubSubClientUnExpectedError.onByKey("message", (channel, message) => {
			cb({
				type: "error",
				optionName: "Errors-Unexpected",
				message,
			});
			handleUnexpectedError(message);
		});
		pubSubClientUnExpectedError.subscribe("dash-error-unexpected");
	}
}

export { DashboardSub };
