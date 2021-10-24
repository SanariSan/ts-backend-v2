import { PubSub } from "../../..";
const pubSubClientLog = new PubSub();

class DashboardPub {
	public static publishLog(msg) {
		pubSubClientLog.publish(
			"dash-log",
			`Some random char ${String.fromCharCode(~~(Math.random() * 100))}`,
		);
	}

	public static publishExpectedError(e) {}
	public static publishUnexpectedError(e) {}
}

export { DashboardPub };
