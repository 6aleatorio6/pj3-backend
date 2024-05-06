import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { jwtSign } from './oAuth.js';
import { prismaPaiado } from '../customPrisma/prismaController.js';

function strategyLocal(tabela, roleUnico = false) {
  const nomeDaStrategy = tabela + roleUnico;
  passport.use(
    nomeDaStrategy,
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'senha' },
      async (email, senha, done) => {
        const { senhaCerta, tokenData } = await verifyEmail(
          email,
          tabela,
          roleUnico,
        );

        autenticarConta({ senha, senhaCerta, done, tokenData });
      },
    ),
  );

  return passport.authenticate(nomeDaStrategy, {
    session: false,
  });
}

async function verifyEmail(email, tabela, roleUnico) {
  const data = await prismaPaiado[tabela].findFirst({
    where: { email },
    select: { id: true, roles: !roleUnico && true, senha: true },
  });
  // se o role/papel for unico ent n existe uma col roles
  const { id, roles, senha } = data || {};

  return { senhaCerta: senha, tokenData: { id, roles: roles || roleUnico } };
}

function autenticarConta({ senha, senhaCerta = '', tokenData, done }) {
  const estaCorreta = bcrypt.compareSync(senha, senhaCerta || '');

  if (!estaCorreta) return done(null, false);

  const token = jwtSign(tokenData);
  done(null, { token });
}

export const loginFuncionario = strategyLocal('funcionario', false);
export const loginUsuario = strategyLocal('usuario', 'USER');
