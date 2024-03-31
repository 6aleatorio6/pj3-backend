import 'dotenv/config.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import prisma from '../../prisma.js';
import { jwtSign } from './jwt-strategy.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/login/google',
    },
    async (accessToken, refreshToken, { _json: data }, done) => {
      const { sub: googleId, ...profile } = data;

      const user = await prisma.usuario.findFirst({
        where: {
          googleId,
        },
        select: { id: true },
      });
      
      if (!user) return done(null, { cadastrar: true, profile });
      
      done(null, { token: jwtSign({ id: user.id, roles: 'USER' }) });
    },
  ),
);

export const loginGoogle = passport.authenticate('google', {
  scope: ['email', 'profile'],
  session: false,
});
