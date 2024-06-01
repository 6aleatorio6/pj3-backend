import createController from '../../helpers/createController.js';
import { ErrorController } from '../../helpers/erroController.js';
import { oauthIndex } from '../../services/auth/indexOauth.js';

/**
 *  endpoint  que redireciona para paginas de login do google ou facebook
 *
 *  PARAMS:
 *      oauthApi: facebook | google
 */
export default createController((req, res) => {
  const { oauthApi } = req.params;

  const isValid = Object.keys(oauthIndex).includes(oauthApi);

  if (!isValid) throw new ErrorController(400, 'params invalido');

  const [urlGoogle] = oauthIndex[oauthApi];

  res.status(303).redirect(urlGoogle);
});
