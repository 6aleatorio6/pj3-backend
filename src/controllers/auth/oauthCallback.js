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
  const { redirectUri, code } = req.query;

  const oauthApi = oauthIndex[oauthName];

  if (!oauthApi) throw new HttpException(400, 'params invalido');

  const { callback } = oauthApi(redirectUri);

  const payload = await callback(code);

  const token = await loginOrSignUp(payload);

  res.redirect(`${redirectUri}/?token=${token}`);
});
