import { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltOrRounds = Number(process.env.PASSWORD_SALTS) || 8;
const secketJwt = process.env.SECKET || 'paia';
const expiresJwt = process.env.JwtExpiresIn || '3m';

export function gerarHash(senha) {
  if (senha) return hashSync(senha, saltOrRounds);
}

export function jwtSign(payload) {
  return jwt.sign(payload, secketJwt, {
    expiresIn: expiresJwt,
  });
}

export function jwtVerify(token) {
  return jwt.verify(token, secketJwt);
}

export function extractTokenFromHeader(req) {
  const [type, token] = req.headers.authorization?.split(' ') ?? [];

  return type === 'Bearer' ? token : undefined;
}
