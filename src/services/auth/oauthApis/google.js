import { OAuth2Client } from 'google-auth-library';
import { HttpException } from '../../secureController/handlersPaia.js';
import { urlOauthCallback } from '../helpersAuth.js';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = urlOauthCallback('google');

// Inicialize o cliente OAuth2
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const authGoogleUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['profile'],
});

export async function googleCallback({ code }) {
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
      apelido: payload.given_name,
    };
  } catch (error) {
    console.log(error);
    throw new HttpException(500, 'erro no oAuth2Client do google', error);
  }
}
