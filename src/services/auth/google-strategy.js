import 'dotenv/config.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { authOAuth2 } from '../../helpers/auth.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/login/google',
    },
    async (accessToken, refreshToken, { _json: data }, done) => {
      const { sub: googleId, email, name, picture } = data;

      const profile = {
        email,
        nome: name,
        foto: picture,
      };

      authOAuth2({ googleId }, profile, done);
    },
  ),
);

export const loginGoogle = passport.authenticate('google', {
  scope: ['email', 'profile'],
  session: false,
});
