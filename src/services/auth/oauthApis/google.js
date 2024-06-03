import { OAuth2Client } from 'google-auth-library';
import { HttpException } from '../../secureController/handlersPaia.js';
import { urlOauthCallback } from '../helpersAuth.js';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

/**
 *  'redirect_uri_mismatch' me lembrarei desse erro fdp por um bom tempo
 *
 * @param {string} redirectUri
 * @returns {{url: string, callback: Function}}
 */
export function oauthGoogle(stateRedirect = '') {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    urlOauthCallback('google'),
  );

  return {
    url: oAuth2Client.generateAuthUrl({
      access_type: 'online',
      state: stateRedirect,
      scope: ['profile'],
    }),
    async callback(code) {
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Obtenha as informações do usuário
        const ticket = await oAuth2Client.verifyIdToken({
          idToken: tokens.id_token,
          audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();

        return {
          googleId: payload.sub,
          foto: payload.picture,
          apelido: payload.given_name || payload.name,
        };
      } catch (error) {
        if (error.response)
          throw new HttpException(
            error.response.status,
            'erro no oAuth2Client do google',
            error.response.data,
          );

        throw new HttpException(500, 'erro no oAuth2Client do google');
      }
    },
  };
}
