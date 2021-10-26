import blessed from "blessed";

function makeMenuBox(): any {
	return blessed.list({
		label: " Menu ",

		top: "0",
		left: "0",
		width: 30 + "%",
		height: "70%",
		padding: 0,

		scrollable: true,
		scrollbar: {
			ch: "=",
			inverse: false,
		},
		keys: true,
		tags: true, // {bold}{/bold}
		autoCommandKeys: true, // for horizontal lists
		border: {
			type: "line",
		},
		style: {
			fg: "white",
			border: {
				fg: "blue",
			},
			scrollbar: {
				bg: "blue",
				fg: "black",
			},
		},
	});
}
export { makeMenuBox };

// focus: {
// 	bg: "blue",
// 	fg: "white",
// },
