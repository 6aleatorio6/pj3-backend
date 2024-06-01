import { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

export function gerarHash(senha) {
  if (senha) return hashSync(senha, Number(process.env.PASSWORD_SALTS) || 8);
}

export function jwtSign(payload) {
  return jwt.sign(payload, process.env.SECKET, {
    expiresIn: 1000 * 60 * process.env.JwtExpiresIn || 3,
  });
}
