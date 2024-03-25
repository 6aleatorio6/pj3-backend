import { jwtSign } from '../../services/auth/jwt-strategy.js';

export default (req, res) => {
  res.json({
    message: 'sucesso no login',
    token: jwtSign(req.user),
  });
};
