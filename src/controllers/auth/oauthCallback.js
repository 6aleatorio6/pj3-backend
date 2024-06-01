import createController from '../../helpers/createController.js';
import { ErrorController } from '../../helpers/erroController.js';
import { oauthIndex } from '../../services/auth/indexOauth.js';

/**
 *  endpoint  que redireciona para paginas de login do google ou facebook
 *
 *  PARAMS:
 *      oauthApi: facebook | google
 */
export default createController(async (req, res) => {
  const { oauthApi } = req.params;

  const isValid = Object.keys(oauthIndex).includes(oauthApi);

  if (!isValid) throw new ErrorController(400, 'params invalido');

  const payload = oauthIndex[oauthApi][1](req.query);

  console.log(payload);
  res.status(200).json(payload);
});
 