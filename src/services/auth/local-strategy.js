import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../../prisma.js';
import bcrypt from 'bcrypt';

function strategyLocal(nome, isfuncio) {
  passport.use(
    nome,
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'senha' },
      async (email, senha, done) => {
        const [senhaHash, tokenData] = await verifyEmail(email, isfuncio);

        autenticarConta({ senha, senhaHash, done, tokenData });
      },
    ),
  );
}

async function verifyEmail(email, isfuncio) {
  const tipo = isfuncio ? 'funcionario' : 'usuario';

  const data = await prisma[tipo].findFirst({
    where: { email },
    select: { id: true, roles: isfuncio && true, senhaHash: true },
  });

  const { id, roles, senhaHash } = data || {};

  return [senhaHash, { id, roles: roles || 'USER' }];
}

function autenticarConta({ senha, senhaHash = '', tokenData, done }) {
  const estaCorreta = bcrypt.compareSync(senha, senhaHash || '');

  if (!estaCorreta) return done(null, false);

  done(null, tokenData);
}

strategyLocal('user', false);
strategyLocal('funcionario', true);

export const loginFuncionario = passport.authenticate('funcionario', {
  session: false,
});
export const loginUsuario = passport.authenticate('user', {
  session: false,
});
