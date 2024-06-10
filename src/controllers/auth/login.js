import endpointBoxSafe from '../../services/secureController/handlerBox.js';
import { jwtSign } from '../../services/auth/helpersAuth.js';

export default endpointBoxSafe(async (req, res) => {
  res.status(200).json({
    message: 'sucesso no login',
    token: jwtSign(req.user),
    user: req.user,
  });
});
