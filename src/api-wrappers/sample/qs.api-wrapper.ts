import { postService } from "../../core/services";
import { stringify } from "querystring";

const sendQs = async () => {
	const resp = await postService({
		host: "https://postman-echo.com",
		path: "/post",
		data: stringify({ foo: 1, bar: 2, baz: 3 }),
	}).catch((e) => {
		console.log(e);
	});

	if (resp) {
		console.log(resp.data);
	}
};

export { sendQs };
