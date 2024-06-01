import createPaia from '../../helpers/createController.js';
import { jwtSign } from '../../services/auth/helpersAuth.js';

export default createPaia(async (req, res) => {
  res.status(200).json({
    message: 'sucesso no login',
    token: jwtSign(req.user),
  });
});
