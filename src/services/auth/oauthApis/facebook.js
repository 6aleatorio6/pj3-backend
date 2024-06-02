import { HttpException } from '../../secureController/handlersPaia.js';
import { urlOauthCallback } from '../helpersAuth.js';

/* eslint-disable camelcase */
const APP_ID = process.env.FACEBOOK_APP_ID;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const urlBaseFb = 'https://www.facebook.com/v19.0';

export function oauthFB(redirectUri) {
  const REDIRECT_URI = urlOauthCallback('facebook', redirectUri);
  return {
    url: `${urlBaseFb}/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email,public_profile`,
    async callback(code) {
      try {
        const { access_token } = await fetch(
          `${urlBaseFb}/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`,
        ).then((r) => r.json());

        const profile = await fetch(
          `${urlBaseFb}/me?fields=name,picture&access_token=${access_token}`,
        ).then((r) => r.json());

        const foto = !profile.picture.data.is_silhouette
          ? profile.picture.data.url
          : undefined;

        return {
          facebookId: profile.id,
          apelido: profile.name,
          foto,
        };
      } catch (error) {
        throw new HttpException(500, 'erro no oAuth2Client do facebook', error);
      }
    },
  };
}
