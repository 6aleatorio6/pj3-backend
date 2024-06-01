import { authGoogleUrl, googleCallback } from './google.js';

/**
 *  INDICE DAS APIS OAUTH DISPONIVEL
 *
 * @typedef {{email: string, foto: string, apelido: string, [idModel: string]: string}} Payload
 *
 * @type {{[key:string]: {url:string, callback: (query) => Promise<Payload>}}}
 */
export const oauthIndex = {
  google: {
    url: authGoogleUrl,
    callback: googleCallback,
  },
};
