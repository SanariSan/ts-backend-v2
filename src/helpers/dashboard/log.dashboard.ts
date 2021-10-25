function gradient(p: number, rgb_beginning: number[], rgb_end: number[]) {
	let w = (p / 100) * 2 - 1;

	let w1 = (w + 1) / 2.0;
	let w2 = 1 - w1;

	let rgb = [
		Math.floor(rgb_beginning[0] * w1 + rgb_end[0] * w2),
		Math.floor(rgb_beginning[1] * w1 + rgb_end[1] * w2),
		Math.floor(rgb_beginning[2] * w1 + rgb_end[2] * w2),
	];

	return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

export { gradient };
