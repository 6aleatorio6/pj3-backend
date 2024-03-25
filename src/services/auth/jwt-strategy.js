import 'dotenv/config.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const secretKey = process.env.SECKET;

// estrategia do passport
passport.use(
  new JwtStrategy(
    {
      secretOrKey: secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => done(null, payload),
  ),
);

// essa funcao cria um middleware
function customAuthenticate(type) {
  // o middleware alterado sabota o next do original e deixa o callback responsavel pela resposta
  return function middlewareAlterado(req, res, next) {
    passport.authenticate('jwt', { session: false }, (er, user) => {
      if (er) return res.status(500).json({ message: 'erro no servidor' });

      if (!user) return res.status(401).json({ message: 'token invalido' });

      const isPassed = user.type !== type;
      if (isPassed) return res.status(403).json({ message: 'Nâo autorizado' });

      next();
    })(req, res, () => 'paia');
  };
}

// middlewares
export const autenticarUser = customAuthenticate('user');
export const autenticarAdm = customAuthenticate('adm');
export const autenticarTotem = customAuthenticate('totem');

// gerar jwt
export const jwtSign = (user, expiresIn) => {
  return jwt.sign(user, secretKey, expiresIn && { expiresIn });
};


// fazer na mão fica mais simples