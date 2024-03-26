import 'dotenv/config.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://yourdomain:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      if (profile) done(null, { cadastro: false, profile });

      done(null, { cadastro: true, profile });
    },
  ),
);

export const loginGoogle = passport.authenticate('google', {
  scope: ['email', 'profile'],
});
