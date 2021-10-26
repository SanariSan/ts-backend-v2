import blessed from "blessed";
import { SCREEN_DEFAULT_PADDINGS } from "../../dashboard.const";

function makeControlsInfoBox() {
	return blessed.text({
		label: " Questions ",

		top: "70%",
		left: "0%",
		width: "100%",
		height: "6%",
		padding: SCREEN_DEFAULT_PADDINGS,

		tags: true,
		style: {
			fg: "white",
		},

		valign: "middle",
		content:
			" left/right: switch boards | up/down/mouse: scroll | Ctrl-C: exit{|} {cyan-fg}{bold}This WORKS!!!{/}  ",
	});
}
export { makeControlsInfoBox };
