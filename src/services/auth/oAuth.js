import jwt from 'jsonwebtoken';

import 'dotenv/config.js';
import { prismaPaiado } from '../customPrisma/prismaController.js';

export function jwtSign(user, expiresIn) {
  return jwt.sign(user, process.env.SECKET, expiresIn && { expiresIn });
}

/**
 *
 * @param {{googleId?: string, facebookId?: string}} whereClause um objeto contendo o id do facebook ou google
 * @param {{nome: string, foto: string, email: string}} profile info para cadastrar
 * @param {() => void} done cb do passport
 * @returns {void}
 */
export async function authOAuth2(whereClause, profile, done) {
  const user = await prismaPaiado.usuario.findFirst({
    where: {
      ...whereClause,
    },
    select: { id: true },
  });

  if (!user) return done(null, { cadastrar: true, profile });

  done(null, { token: jwtSign({ id: user.id, roles: 'USER' }) });
}
