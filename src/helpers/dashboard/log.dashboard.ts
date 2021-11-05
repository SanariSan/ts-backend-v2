// .map((el) => `{${gradient(0, [255, 0, 0], [0, 255, 0])}-fg} | ${el}{/}`);
function gradient(p: number, rgb_beginning: number[], rgb_end: number[]) {
  const w = (p / 100) * 2 - 1;

  const w1 = (w + 1) / 2;
  const w2 = 1 - w1;

  const rgb = [
    Math.floor(rgb_beginning[0] * w1 + rgb_end[0] * w2),
    Math.floor(rgb_beginning[1] * w1 + rgb_end[1] * w2),
    Math.floor(rgb_beginning[2] * w1 + rgb_end[2] * w2),
  ];

  return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`;
}

function formatStr(str, maxLineLength) {
  const piecesRegexp = new RegExp(`.{0,${maxLineLength}}`, 'g');
  const pieces = str.match(piecesRegexp);

  return pieces.filter((el) => el.length).map((el, i) => `${i === 0 ? '*' : ' '}| ${el}`);
}

export { gradient, formatStr };
