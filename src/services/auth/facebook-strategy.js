import 'dotenv/config.js';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    },
  ),
);

export const loginFacebook = passport.authenticate('facebook', {
  scope: ['id', 'displayName', 'photos', 'email'],
});
