import blessed from "blessed";

function makeMenuBox() {
	return blessed.list({
		top: "0",
		left: "0",
		width: 30 + "%",
		height: "70%",
		padding: 0,
		scrollbar: {
			ch: " ",
			//@ts-ignore
			inverse: false,
		},
		border: {
			type: "line",
		},
		keys: true,
		autoCommandKeys: true,
		tags: true,
		style: {
			selected: {
				bg: "blue",
				fg: "white",
			},
			//@ts-ignore
			scrollbar: {
				bg: "blue",
				fg: "black",
			},
			fg: "white",
			border: {
				fg: "blue",
			},
			header: {
				fg: "blue",
			},
		},
	});
}

export { makeMenuBox };
