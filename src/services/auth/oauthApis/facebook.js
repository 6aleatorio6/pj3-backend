import { HttpException } from '../../secureController/handlersPaia.js';
import { fetchPaiado, urlOauthCallback } from '../helpersAuth.js';

/* eslint-disable camelcase */
const APP_ID = process.env.FACEBOOK_APP_ID;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const urlBaseFb = 'https://www.facebook.com/v17.0';
const REDIRECT_URI = urlOauthCallback('facebook');

export function oauthFB(stateRedirect = '') {
  return {
    url: `${urlBaseFb}/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&state=${stateRedirect}&scope=email,public_profile`,
    async callback(code) {
      try {
        const { access_token } = await fetchPaiado(
          `${urlBaseFb}/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&state=${stateRedirect}&code=${code}&redirect_uri=${REDIRECT_URI}`,
        );

        const profile = await fetchPaiado(
          `${urlBaseFb}/me?fields=name,picture&access_token=${access_token}`,
        );

        const foto = !profile.picture.data.is_silhouette
          ? profile.picture.data.url
          : undefined;

        return {
          facebookId: profile.id,
          apelido: profile.name,
          foto,
        };
      } catch (error) {
        console.log(error);
        throw new HttpException(500, 'erro no oAuth2Client do facebook', error);
      }
    },
  };
}
