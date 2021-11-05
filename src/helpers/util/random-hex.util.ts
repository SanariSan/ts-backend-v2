import Crypto from 'node:crypto';

export const randomHex = (length = 16) =>
  Crypto.randomBytes(length).toString('hex').slice(0, length);
