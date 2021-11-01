import { postService } from "../../core/services";

const sendJson = async () => {
	const resp = await postService({
		host: "https://postman-echo.com",
		path: "/post",
		data: { foo: 1, bar: 2, baz: 3 },
	}).catch((e) => {
		console.log(e);
	});

	if (resp) {
		console.log(resp.data);
	}
};

export { sendJson };
