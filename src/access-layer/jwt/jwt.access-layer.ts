import { JWTDecode, JWTEncode, JWTError, JWTPayloadBuilder } from '../../core/jwt';
import type { TObjectUnknown } from '../../general.type';

// TODO: change TObjectUnknown to typed object, when token prm format is stable
function jwtEncode(customPayload: TObjectUnknown) {
  const now = Date.now();
  const payload = new JWTPayloadBuilder()
    .setIat(now)
    .setExp(now + 1000 * 60 * 60 * 24 * Number(process.env.JWT_EXP))
    .setPrm(JSON.stringify(customPayload))
    .getPayload();

  return new JWTEncode(payload, process.env.JWT_SECRET).sign();
}

async function jwtDecode(token: string) {
  const payload = await new JWTDecode(token, process.env.JWT_SECRET).verify();

  // check fields of verified token
  if (payload.iat === undefined || payload.exp === undefined || payload.prm === undefined) {
    throw new JWTError('Malformed token');
  }

  return payload;
}

export { jwtDecode, jwtEncode };
