import createController from '../../helpers/createController.js';
import { ErrorController } from '../../helpers/erroController.js';
import { oauthIndex } from '../../services/auth/oauthApis/index.js';

/**
 *  endpoint  que redireciona para paginas de login do google ou facebook
 *
 *  PARAMS:
 *      oauthApi: facebook | google
 */
export default createController((req, res) => {
  const oauthName = req.params?.oauthName;

  const oauthApi = oauthIndex[oauthName];

  if (!oauthApi) throw new ErrorController(400, 'params invalido');

  res.status(303).redirect(oauthApi.url);
});
