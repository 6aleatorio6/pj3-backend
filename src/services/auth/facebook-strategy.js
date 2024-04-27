import 'dotenv/config.js';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { authOAuth2 } from '../../helpers/oAuth.js';

passport.use(
  'facebook',
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || 'paia',
      clientSecret: process.env.FACEBOOK_APP_SECRET || 'paia',
      callbackURL: '/auth/login/facebook',
      profileFields: ['id', 'email', 'displayName', 'photos'],
    },
    (accessToken, refreshToken, { _json: data }, done) => {
      const { id: facebookId, email, name, picture } = data;

      const profile = {
        email,
        nome: name,
        foto: !picture.is_silhouette && picture.url,
      };

      authOAuth2({ facebookId }, profile, done);
    },
  ),
);

export const loginFacebook = passport.authenticate('facebook', {
  session: false,
});
