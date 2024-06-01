import jwt from 'jsonwebtoken';
import createPaia from '../../helpers/createController.js';
import { ErrorController } from '../../helpers/erroController.js';
import { extractTokenFromHeader, jwtVerify } from './helpersAuth.js';

/**
 * @param {"USER" | "ADM" | "TOTEM"} roles
 */
export function useGuard(...roles) {
  return createPaia(async (req, res, next) => {
    const token = extractTokenFromHeader(req);

    if (!token) throw new ErrorController(401, 'você não está logado');

    const payload = jwtLogica(token);

    const isAuth = !roles.includes(payload.roles);

    if (isAuth) throw new ErrorController(403, 'você não está autorizado');

    req.user = {
      id: payload.id,
      roles: payload.roles,
    };

    next();
  });
}

function jwtLogica(token) {
  try {
    return jwtVerify(token);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      throw new ErrorController(401, 'token expirado');

    if (error instanceof jwt.JsonWebTokenError)
      throw new ErrorController(401, 'token invalido');

    throw error;
  }
}
