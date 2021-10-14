import Crypto from "crypto";

function randomHex(length = 21) {
	return Crypto.randomBytes(length).toString("hex").slice(0, length);
}

export { randomHex };
