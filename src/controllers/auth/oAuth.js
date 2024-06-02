import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { HttpException } from '../../services/secureController/handlersPaia.js';
import { oauthIndex } from '../../services/auth/oauthApis/index.js';

/**
 *  endpoint  que redireciona para paginas de login do google ou facebook
 *
 *  PARAMS:
 *      oauthApi: facebook | google
 */
export default endpointBoxSafe((req, res) => {
  const oauthName = req.params?.oauthName;

  const oauthApi = oauthIndex[oauthName];

  if (!oauthApi) throw new HttpException(400, 'params invalido');

  res.status(303).redirect(oauthApi.url);
});
