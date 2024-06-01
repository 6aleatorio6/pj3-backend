import { ErrorController } from '../../../helpers/erroController.js';
import { urlOauthCallback } from '../helpersAuth.js';

/* eslint-disable camelcase */
const APP_ID = process.env.FACEBOOK_APP_ID;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const REDIRECT_URI = urlOauthCallback('facebook');

export const authFacebookUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email,public_profile`;

export async function facebookCallback({ code }) {
  try {
    const { access_token } = await fetch(
      `https://graph.facebook.com/v17.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`,
    ).then((r) => r.json());

    const profile = await fetch(
      `https://graph.facebook.com/v17.0/me?fields=name,picture&access_token=${access_token}`,
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
    console.log(error);
    throw new ErrorController(500, 'erro no oAuth2Client do facebook', error);
  }
}
