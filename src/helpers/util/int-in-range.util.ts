function getIntInRange(min: number = 0, max: number = min + 1) {
	return Math.round(Math.random() * (max - min)) + min;
}

export { getIntInRange };
