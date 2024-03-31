import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../../prisma.js';
import bcrypt from 'bcrypt';
import { jwtSign } from './jwt-strategy.js';

function strategyLocal(tabela, roleUnico = false) {
  const nomeDaStrategy = tabela + roleUnico;
  passport.use(
    nomeDaStrategy,
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'senha' },
      async (email, senha, done) => {
        const { senhaHash, tokenData } = await verifyEmail(
          email,
          tabela,
          roleUnico,
        );

        autenticarConta({ senha, senhaHash, done, tokenData });
      },
    ),
  );

  return passport.authenticate(nomeDaStrategy, {
    session: false,
  });
}

async function verifyEmail(email, tabela, roleUnico) {
  const data = await prisma[tabela].findFirst({
    where: { email },
    select: { id: true, roles: !roleUnico && true, senhaHash: true },
  });

  // se o role/papel for unico ent n existe uma col roles
  const { id, roles, senhaHash } = data || {};

  return { senhaHash, tokenData: { id, roles: roles || roleUnico } };
}

function autenticarConta({ senha, senhaHash = '', tokenData, done }) {
  const estaCorreta = bcrypt.compareSync(senha, senhaHash || '');

  if (!estaCorreta) return done(null, false);

  const token = jwtSign(tokenData);
  done(null, { token });
}

export const loginFuncionario = strategyLocal('funcionario', false);
export const loginUsuario = strategyLocal('usuario', 'USER');
