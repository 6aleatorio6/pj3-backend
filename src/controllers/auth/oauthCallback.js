import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { HttpException } from '../../services/secureController/handlersPaia.js';
import { oauthIndex } from '../../services/auth/oauthApis/index.js';
import loginOrSignUp from '../../services/auth/oauthLogin.js';

/**
 *  endpoint  que redireciona para paginas de login do google ou facebook
 *
 *  PARAMS:
 *      oauthApi: facebook | google
 */
export default endpointBoxSafe(async (req, res) => {
  const oauthName = req.params?.oauthName;
  const query = req.query;

  const oauthApi = oauthIndex[oauthName];

  if (!oauthApi) throw new HttpException(400, 'params invalido');

  const payload = await oauthApi.callback(query);

  const token = await loginOrSignUp(payload);

  res.status(200).json({
    message: `sucesso no login com o ${oauthName}`,
    token,
  });
});
