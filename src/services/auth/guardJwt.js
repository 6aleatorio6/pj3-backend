import endpointBoxSafe from '../secureController/handlerBox.js';
import { HttpException } from '../secureController/handlersPaia.js';
import { extractTokenFromHeader, jwtVerify } from './helpersAuth.js';

/**
 * @param {("USER" | "ADM" | "TOTEM")[]} roles
 */
export function useGuard(...roles) {
  return endpointBoxSafe(async (req, res, next) => {
    const token = extractTokenFromHeader(req);

    if (!token) throw new HttpException(401, 'sem token de sessão');

    const result = jwtVerify(token);

    if (!result) throw new HttpException(401, 'token de sessão invalido');
    if (result === 'REFRESH') return res.status(302).redirect('/token/refresh');

    const isAuth = !roles.includes(result.roles);

    if (isAuth) throw new HttpException(403, 'Você não tem permissão');

    req.user = {
      id: result.id,
      roles: result.roles,
    };

    next();
  });
}
