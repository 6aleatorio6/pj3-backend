import { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltOrRounds = Number(process.env.PASSWORD_SALTS) || 8;
const secretJwt = process.env.SECRET_JWT || 'paia';
const expiresJwt = process.env.EXPIRES_JWT || '3m';
const refreshJwt = Number(process.env.REFRESH_JWT) || 364;
const urlBase = process.env.URLBASE || 'http://localhost:3000';

export function gerarHash(senha) {
  if (senha) return hashSync(senha, saltOrRounds);
}

export function jwtSign(payload) {
  return jwt.sign(payload, secretJwt, {
    expiresIn: expiresJwt,
  });
}

export function extractTokenFromHeader(req) {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];

  return type === 'Bearer' ? token : undefined;
}

export function urlOauthCallback(oauthName, redirectUri) {
  return `${urlBase}/usuario/login/${oauthName}/callback/?${redirectUri}`;
}

export function jwtVerify(token) {
  try {
    return jwt.verify(token, secretJwt);
  } catch (error) {
    if (!(error instanceof jwt.TokenExpiredError)) return false;

    const minDesdeExp = (Date.now() - error.expiredAt.valueOf()) / 1000 / 60;
    return minDesdeExp <= 60 * 24 * refreshJwt ? 'REFRESH' : null;
  }
}
