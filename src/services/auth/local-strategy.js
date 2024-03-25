import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../../prisma.js';
import bcrypt from 'bcrypt';

passport.use(
  'user',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'senha' },
    async (email, senha, done) => {
      const user = await prisma.usuario.findFirst({
        where: { email },
        select: { id: true, senhaHash: true },
      });

      const isPassed = bcrypt.compareSync(senha, user.senhaHash);
      if (!user && !isPassed) return done(null, false);

      // sucesso
      done(null, { type: 'user', user: { id: user.id } });
    },
  ),
);

passport.use(
  'funcionario',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'senha' },
    async (email, senha, done) => {
      const user = await prisma.funcionario.findFirst({
        where: { email },
        select: { id: true, adm: true, senhaHash: true },
      });

      
      const isPassed = bcrypt.compareSync(senha, user.senhaHash);
      if (!user && !isPassed) return done(null, false);
      
      // sucesso
      const type = user.adm ? 'adm' : 'totem';
      done(null, { type, user: { id: user.id } });
    },
  ),
);

export const loginFuncionario = passport.authenticate('funcionario', {
  session: false,
});
export const loginUsuario = passport.authenticate('user', {
  session: false,
});
