import { postService } from "../../core/services";
import { makeForm } from "../../helpers/services";

const sendMultipart = async () => {
	const form = makeForm({ obj: { foo: 1, bar: 2, baz: 3 } });

	const resp = await postService({
		host: "https://postman-echo.com",
		path: "/post",
		data: form,
		headers: {
			...form.getHeaders(),
		},
	}).catch((e) => {
		console.log(e);
	});

	if (resp) {
		console.log(resp.data);
	}
};

export { sendMultipart };
