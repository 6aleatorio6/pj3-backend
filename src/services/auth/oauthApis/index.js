import { oauthFB } from './facebook.js';
import { oauthGoogle } from './google.js';

/**
 *  INDICE DAS APIS OAUTH DISPONIVEL
 *
 * @typedef {{email: string, foto: string, apelido: string, [idModel: string]: string}} Payload
 *
 * @type {{[key:string]: {url:string, callback: (query) => Promise<Payload>}}}
 */
export const oauthIndex = {
  google: oauthGoogle,
  facebook: oauthFB,
};
