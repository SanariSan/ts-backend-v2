import blessed from "blessed";
import { SCREEN_DEFAULT_PADDINGS } from "../../../dashboard.const";

function makeControlsInfoBox() {
	return blessed.text({
		label: " Questions ",
		content:
			" left/right: switch boards | up/down/mouse: scroll | Ctrl-C: exit{|} {cyan-fg}{bold}This WORKS!!!{/}  ",
		left: "0%",
		top: "70%",
		width: "100%",
		height: "6%",
		padding: SCREEN_DEFAULT_PADDINGS,
		valign: "middle",
		tags: true,
		style: {
			fg: "white",
		},
	});
}
export { makeControlsInfoBox };
