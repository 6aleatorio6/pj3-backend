import createController from '../../helpers/createController.js';
import { ErrorController } from '../../helpers/erroController.js';
import { oauthIndex } from '../../services/auth/oauthApis/index.js';
import loginOrSignUp from '../../services/auth/oauthLogin.js';

/**
 *  endpoint  que redireciona para paginas de login do google ou facebook
 *
 *  PARAMS:
 *      oauthApi: facebook | google
 */
export default createController(async (req, res) => {
  const oauthName = req.params?.oauthName;
  const query = req.query;

  const oauthApi = oauthIndex[oauthName];

  if (!oauthApi) throw new ErrorController(400, 'params invalido');

  const payload = await oauthApi.callback(query);

  const token = await loginOrSignUp(payload);

  res.status(200).json({
    message: `sucesso no login com o ${oauthName}`,
    token,
  });
});
