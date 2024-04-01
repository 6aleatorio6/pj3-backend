import 'dotenv/config.js';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const secretKey = process.env.SECKET;

passport.use(
  'jwt',
  new JwtStrategy(
    {
      secretOrKey: secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      done(null, payload);
    },
  ),
);

/**
 * @param {...("ADM"|"TOTEM"| "USER")} roles
 */
export function acessoApenasPara(...roles) {
  return function middlewareAlterado(req, res, next) {
    const nextPaiado = () => {
      const permiRota = roles.includes(req.user.roles);

      if (!permiRota)
        return res.status(403).json({ message: 'Nâo autorizado' });

      next();
    };

    passport.authenticate('jwt', { session: false })(req, res, nextPaiado); // PAIA
    // custava ter uma opcao de msg personalizada em json? :(
  };
}
